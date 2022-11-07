from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.
class Post(models.Model):
    """
        Post model
    """

    class PostObjects(models.Manager):
        """
            Return the Post object and all children posts
        """

        def get_queryset(self):
            return super().get_queryset().filter(id='')

    title = models.CharField(max_length=250)
    body = models.TextField()
    # Author deletion cascade deletes all of author's posts
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE,
                               related_name='forum_posts')
    # if a post is deleted, all children posts will also be deleted
    # defines recursive many-to-one relationship
    parent_post = models.ForeignKey('self',
                                    on_delete=models.CASCADE,
                                    blank=True,
                                    null=True,
                                    related_name='parent_post_id')
    time_stamp = models.DateTimeField(default=timezone.now)

    # Default object manager
    objects = models.Manager()
    # Custom object manager for a particular object
    post_objects = PostObjects()

    def __str__(self):
        return self.title


class QuestionCategory(models.Model):
    """
        Category model
    """
    name = models.CharField(max_length=100, primary_key=True, null=False, default='')

    # Default object manager
    objects = models.Manager()

    def __str__(self):
        return self.name


class TechBehQuestion(models.Model):
    """
        Technical Behavioural Questions bank model
    """
    question_category = models.ForeignKey(QuestionCategory,
                                          on_delete=models.CASCADE)
    question_name = models.CharField(max_length=200)
    question_description = models.TextField()
    question_url = models.TextField()

    # Default object manager
    objects = models.Manager()


class UserProgress(models.Model):
    """
        User Progress model
    """
    class Meta:
        # Ensures user Id and question Id are unique
        unique_together = (('user_id', 'question_id'),)

    # Models don't allow composite keys - so instead we have two
    # foreign keys with unique together constraint
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    question_id = models.ForeignKey(TechBehQuestion,
                                    on_delete=models.CASCADE)

    # Default object manager
    objects = models.Manager()
