from rest_framework.exceptions import ValidationError
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated, AllowAny, \
    IsAuthenticatedOrReadOnly
from rest_framework import generics
from . import models
from . import serializers
from django.db.models import Q
from django.apps import apps
from . import indeedScraper
from cloudscraper.exceptions import CloudflareChallengeError
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')


class PostList(generics.ListCreateAPIView):
    """
        Create a post or get a list of all posts within the database that are parent posts
        API endpoints that use this view:
            - /posts
   """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.Post.objects.select_related('author')
    serializer_class = serializers.PostSerializer

    def perform_create(self, serializer):
        """
            Adds creation guidlines for a post:
                1. Author of post automatically assigned to user who sent
                    POST request
                2. Replies to replies are not allowed (for any post setting
                    a parent post, the parent post must exist and its parent
                    post must be null)
        """
        # If parent_post isn't sent in body of request, just ignore it
        # try catch is used to impose this behaviour
        try:
            # Ensure parent post is valid
            if not self.request.data['parent_post'] is None:
                # If parent field was null, this is a root post, and just save it
                if not self.request.data['parent_post'] == '':
                    # If parent's parent post exists, we can't reply to this post
                    parent_object = models.Post.objects.get(id=self.request.data['parent_post'])
                    if parent_object.parent_post_id is not None:
                        raise ValidationError('Can\'t respond to a response')
        except KeyError:
            logging.info("No parent_post_id provided - setting to root node")
            pass

        # Automatically set the author of a post to the user that sent the request
        serializer.save(author=self.request.user)


class PostUserWritePermission(BasePermission):
    """
        Creates permission class for posts - only post authors
        may delete or modify a post. All other users can view posts
    """
    message = 'Modifying posts restricted to author only'

    def has_object_permission(self, request, view, obj):
        # If method is GET OPTIONS AND HEAD (read only allowed for all)
        if request.method in SAFE_METHODS:
            return True

        # If object author is same as request user, return true
        # else not authenticated
        return obj.author == request.user


class PostModify(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    """
        Retrieve a specific post object and all its children posts
        Will only be valid if specified post is a root post.
        Also retrieves and responds with all reply posts to a
        root post
        API endpoints that use this view:
            - /postsModify/<int:pk>
   """
    permission_classes = [PostUserWritePermission]
    queryset = models.Post.objects.get_queryset()
    serializer_class = serializers.PostSerializer


class PostDetail(generics.ListAPIView):
    """
        Post to get a post and all its children posts
        Endpoints that use this view:
            - /posts/<int:pk>
    """
    permission_classes = [AllowAny]
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        """
            Define new get query set function to get the child post and all
            its children posts
        """
        posts = self.kwargs.get('pk')  # Get pk from url path
        return models.Post.objects.filter(Q(parent_post_id=posts) | Q(id=posts)).select_related('author')


class GetQuestions(generics.ListAPIView):
    """
        Gets a list of questions from the question bank
        API endpoints that use this view:
            - /questionsBank
    """
    permission_classes = [AllowAny]
    serializer_class = serializers.TechBehQuestionSerializer

    def get_queryset(self):
        """
            Return questions according to category defined in optional
            parameter. Default returns all questions
        """
        # If category parameter is given, filter based on category
        if self.request.GET.get('category'):
            try:
                # Check to see if category exists
                category = models.QuestionCategory.objects.get(name=self.request.GET.get('category'))
            except models.QuestionCategory.DoesNotExist:
                logging.info(f"Category {self.request.GET.get('category')} doesn't exist")
                raise ValidationError(detail='Category doesn\'t exist')
            return models.TechBehQuestion.objects.filter(question_category=category)
        # Return all questions
        return models.TechBehQuestion.objects.all()


class UserProgress(generics.ListCreateAPIView):
    """
        Gets user progress by getting all questions completed by the user
        Also used to mark a question completed
        API endpoints that use this view:
            - /userProgress/
    """
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserProgress

    def perform_create(self, serializer):
        """
            Only allow user to update progress for themselves
        """
        # Ensure question not already marked complete by user
        questions_done_by_user = models.UserProgress.objects.filter(user_id=self.request.user.id)
        if questions_done_by_user.filter(question_id=self.request.data['question_id']). \
                exists():
            logging.warning(f"Question {self.request.data['question_id']} for user"
                            f"{self.request.user.id} already marked completed")
            raise ValidationError('Already marked question as completed')
        # Update user progress
        model = apps.get_model('users', 'User')
        user_object = model.objects.get(id=self.request.user.id)
        user_object.progress_percentage = ((questions_done_by_user.count() + 1) /
                                           models.TechBehQuestion.objects.count()) * 100
        # Create user question entry and save object
        serializer.save(user_id=self.request.user)
        user_object.save()

    def get_queryset(self):
        """
            Return all user progress entries pertaining to the user
        """
        return models.UserProgress.objects.filter(user_id=self.request.user.id)


class QuestionCategories(generics.ListAPIView):
    """
        Gets all question categories present within the database.
        API endpoints that use this view:
            - /questionCategories
    """
    permission_classes = [AllowAny]
    queryset = models.QuestionCategory.objects.all()
    serializer_class = serializers.QuestionCategorySerializer


class JobPostings(generics.ListAPIView):
    """
        Gets jobs for a particular set of parameters
        API endpoints that use this view:
            - /jobPostings
    """
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.JobPosting

    def get_queryset(self):
        """
            Return questions according to category defined in optional
            parameter. Default returns all questions
        """

        # If job_title and location fields not provided, throw an error
        try:
            job_title = self.request.data['job_title']
            location = self.request.data['location']
        except KeyError:
            logging.error("No job_title and location provided in body of request")
            raise ValidationError("Provide a non-empty 'job_title' and 'location' within body of request")

        # If job_title and location fields are empty, throw an error
        if job_title == '' or location == '':
            logging.error("Empty job_title or empty location provided in body of request")
            raise ValidationError("Provide a non-empty 'job_title' and 'location' within body of request")

        try:
            job_list = indeedScraper.transform(indeedScraper.extract_data(job_title, location, 0))
        except indeedScraper.UnableToFindJobDivs:
            logging.error(f"Indeed returned no results for {job_title} at {location}")
            raise ValidationError("Indeed returned no results. Please enter a valid job title and \
                    location")
        except indeedScraper.RequestFailed:
            logging.error(f"Request to indeed failed for {job_title} at {location}")
            raise ValidationError("Request to Indeed failed. Please try again")
        except indeedScraper.DDosProtectionCloudFlare:
            logging.error(f"Failed scraping due to cloud flare security for {job_title} at {location}")
            raise ValidationError("Ran into Cloudflare Security at Indeed. Please try again in a few moments")
        except CloudflareChallengeError:
            logging.error(f"Failed scraping due to level 2 cloud flare security for {job_title} at {location}")
            raise ValidationError("Ran into Cloudflare protection at Indeed. Please try again momentarily")
        # Return all jobs
        return job_list


class JobPostingsStatic(generics.ListAPIView):
    """
        USE THIS VIEW ONLY AS WORST CASE SCENARIO
    """
    permission_classes = [AllowAny]
    serializer_class = serializers.JobPostingStatic

    def get_queryset(self):
        """
            Return questions according to category defined in optional
            parameter. Default returns all questions
        """
        # If category parameter is given, filter based on category
        if self.request.GET.get('job_title') and self.request.GET.get('location'):
            jobs = models.JobPosting.objects.filter(job_title_category=self.request.GET.get('job_title'),
                                                    location=self.request.GET.get('location'))
            if not jobs:
                raise ValidationError(detail='Job and Location combination doesn\'t exist')

            return jobs

        # Return all job postings
        return models.JobPosting.objects.all()
