from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    # path('', ),
    path('createUser/', CreateUser.as_view(), name='createUser'),
    path('getUser/<int:pk>', GetUser.as_view(), name='getUser'),
    path('questionsBank/', GetQuestions.as_view(), name='questionsBank'),
    path('posts/', PostList.as_view(), name='getPosts'),
    path('posts/<int:pk>', PostDetail.as_view(), name='getPost'),
    path('postChildren/<int:pk>', PostAndChildren.as_view(), name='postChildren'),
    path('userProgress/<int:pk>', UserProgress.as_view(), name='getUserProgress'),
    path('jobPostings/', JobPostings.as_view(), name='getJobPostings'),
]
