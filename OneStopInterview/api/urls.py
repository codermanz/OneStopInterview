from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('questionsBank/', GetQuestions.as_view(), name='questionsBank'),
    path('posts/', PostList.as_view(), name='listPosts'),
    path('posts/<int:pk>', PostDetail.as_view(), name='postDetail'),
    path('postsModify/<int:pk>', PostModify.as_view(), name='modifyPost'),
    path('userProgress/', UserProgress.as_view(), name='userProgress'),
    # path('jobPostings/', JobPostings.as_view(), name='jobPostings'),
    path('questionCategories/', QuestionCategories.as_view(), name='questionCategories')
]
