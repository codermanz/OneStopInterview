from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


# Create your models here.
class Post(models.Model):
    """
        Post model
    """
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(id='')

    title = models.CharField(max_length=250)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE,
                               related_name='forum_posts')
    objects = models.Manager()
    post_objects = PostObjects()

    def __str__(self):
        return self.title


class UserProgress(models.Model):
    """
        User Progress model
    """
    pass


class TechBehQuestion(models.Model):
    """
        Technical Behvaioural Questions bank model
    """
    pass


class QuestionCategory(models.Model):
    """
        Category model
    """
    pass


