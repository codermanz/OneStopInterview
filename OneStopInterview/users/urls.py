from django.urls import path
from .views import CustomUserCreate, UserObject, ClearUserProgress, BlacklistTokenView

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('userInfo/', UserObject.as_view(), name='get_user'),
    path('clearProgress/', ClearUserProgress.as_view(), name='clear_progress'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
]
