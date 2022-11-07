from django.urls import path, include
from .views import *
urlpatterns = [
    # path('', ),
    path('createPost/', PostList.as_view(), name='createPost'),
    path('createUser/', CreateUser.as_view(), name='createUser'),
    path('getUser/<int:pk>', GetUser.as_view(), name='getUser'),
    path('admin/deletePost/<int:pk>', PostDetail.as_view(), name='deletePost'),
    path('questionsBank/', GetQuestions.as_view(), name='questionsBank'),
    path('posts/', PostList.as_view(), name='getPosts'),
    path('posts/<int:pk>', PostDetail.as_view(), name='getPost'),
    path('userProgress/<int:pk>', UserProgress.as_view(), name='getUserProgress'),
    path('modifyUserProgress/<int:pk>', UserProgress.as_view(), name='modifyUserProgress'),
    path('deletePost/<int:pk>', PostDetail.as_view(), name='deletePost'),
    path('jobPostings/', JobPostings.as_view(), name='getJobPostings'),
]
