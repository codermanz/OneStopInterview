from django.urls import path, include
from .views import *
urlpatterns = [
    path('', main),
    path('createPost/', main, name='createPost'),
    path('createUser/', main, name='createUser'),
    path('getUser/<int:pk>', main, name='getUser'),
    path('admin/addQuestion', main, name='addQuestion'),
    path('admin/addCategory', main, name='addCategory'),
    path('admin/deletePost/<int:pk>', main, name='deletePost'),
    path('admin/getCategories', main, name='getCategories'),
    path('questionsBank/', main, name='questionsBank'),
    path('posts/', main, name='getPosts'),
    path('posts/<int:pk>', main, name='getPost'),
    path('userProgress/<int:pk', main, name='getUserProgress'),
    path('modifyUserProgress/<int:pk>', main, name='modifyUserProgress'),
    path('deletePost/<int:pk>', main, name='deletePost'),
    path('jobPostings/', main, name='getJobPostings'),
]
