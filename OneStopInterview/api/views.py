from rest_framework.exceptions import ValidationError
from rest_framework.permissions import SAFE_METHODS, BasePermission, DjangoModelPermissionsOrAnonReadOnly, AllowAny, DjangoModelPermissions
from rest_framework import generics
from . import models
from . import serializers
from django.db.models import Q


class PostList(generics.ListCreateAPIView):
    """
        Create a post or get a list of all posts within the database that are parent posts
        API endpoints that use this view:
            - /posts
   """
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = models.Post.objects.all()
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
        # Ensure parent post is valid
        if not self.request.data['parent_post'] is None:
            parent_object = models.Post.objects.get(id=self.request.data['parent_post'])
            if parent_object.parent_post_id is not None:
                raise ValidationError('Can\'t respond to a response')

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


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    """
        Retrieve a specific post object and all its children posts
        Will only be valid if specified post is a root post.
        Also retrieves and responds with all reply posts to a
        root post
        API endpoints that use this view:
            - /posts/{post_id}
   """
    permission_classes = [PostUserWritePermission]
    queryset = models.Post.objects.get_queryset()
    serializer_class = serializers.PostSerializer


class PostAndChildren(generics.ListAPIView):
    """
        Post to get a post and all its children posts
    """
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        """
            Define new get query set function to get the child post and all
            its children posts
        """
        posts = self.kwargs.get('pk')  # Get pk from url path
        return models.Post.objects.filter(Q(parent_post_id=posts) | Q(id=posts))


class CreateUser(generics.CreateAPIView):
    """
        Creates a specified user's object
        API endpoints that use this view:
            - /createUser
    """
    pass


class GetUser(generics.RetrieveAPIView):
    """
        Retrieve a user's view
        API endpoints that use this view:
            - /getUser/{user_id}
    """
    pass


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
                raise ValidationError(detail='Category doesn\'t exist')
            return models.TechBehQuestion.objects.filter(name=category)
        # Return all questions
        return models.TechBehQuestion.objects.all()


class UserProgressPermissions(BasePermission):
    """
        Creates permission class for user progress - can only access your
        own progress
    """
    message = 'Can only access your own progress'

    def has_permission(self, request, view):
        return request.user.id == request.resolver_match.kwargs['pk']


class UserProgress(generics.ListCreateAPIView, UserProgressPermissions):
    """
        Gets user progress by getting all questions completed by the user
        Also used to mark a question completed
        API endpoints that use this view:
            - /userProgress/{user_id}
    """
    permission_classes = [UserProgressPermissions]
    serializer_class = serializers.UserProgress

    def perform_create(self, serializer):
        """
            Only allow user to update progress for themselves
        """
        if self.request.user.id != self.request.data['user_id']:
            raise ValidationError('Can\'t modify progress for another user')
        serializer.save()

    def get_queryset(self):
        """
            Return all user progress entries pertaining to the user
        """
        return models.UserProgress.objects.filter(user_id=self.kwargs['pk'])


class JobPostings(generics.ListAPIView):
    """
        Gets jobs for a particular set of parameters
        API endpoints that use this view:
            - /jobPostings
    """
    pass
