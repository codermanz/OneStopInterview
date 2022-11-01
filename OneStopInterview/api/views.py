from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics


class PostList(generics.ListCreateAPIView):
    """
        Create a post or get a list of all posts within the database that are parent posts
        API endpoints that use this view:
            - /posts
            - /createPost
   """
    # Create queryset
    # Serialize
    pass


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        Retrieve a specific post object and all its children posts
        Will only be valid if specified post is a root post.
        Also retrieves and responds with all reply posts to a
        root post
        API endpoints that use this view:
            - /posts/{post_id}
            - /deletePost/{post_id}
            - /admin/deletePost/{post_id}
   """
    # Create queryset
    # Serialize
    pass


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


class GetQuestions(generics.ListCreateAPIView):
    """
        Gets a list of questions from the question bank
        API endpoints that use this view:
            - /questionsBank
            - /admin/addQuestion
    """
    pass


class UserProgress(generics.ListCreateAPIView):
    """
        Gets user progress by getting all questions completed by the user
        Also used to mark a question completed
        API endpoints that use this view:
            - /userProgress/{user_id}
            - modifyUserProgress/{user_id}
    """
    pass


class JobPostings(generics.ListAPIView):
    """
        Gets jobs for a particular set of parameters
        API endpoints that use this view:
            - /jobPostings
    """
    pass


class Category(generics.ListCreateAPIView):
    """
        Add categories or get list of all cetegories
        API endpoints that use this view:
            - /admin/addCategory
            - /admin/getCategories
    """
    pass


def main(request):
    """

   """
    return HttpResponse("Hello World")
