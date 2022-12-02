from django.db import models
from django.conf import settings
from django.utils import timezone


# Create your models here.
class Post(models.Model):
    """
        Post model
    """

    title = models.CharField(max_length=250)
    body = models.TextField()
    # Author deletion cascade deletes all of author's posts
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE,
                               related_name='forum_posts')
    # if a post is deleted, only it will be deleted and all other children
    # posts will remain - also defines recursive many-to-one relationship
    parent_post = models.ForeignKey('self',
                                    on_delete=models.CASCADE,
                                    blank=True,
                                    null=True)
    time_stamp = models.DateTimeField(default=timezone.now)

    # Default object manager
    objects = models.Manager()

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

    def __str__(self):
        return f"Name: {self.question_name}, Category: {self.question_category}"


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

    def __str__(self):
        return f"User ID: {self.user_id}, Question ID: {self.question_id}"


class JobPosting(models.Model):
    """
        Job Posting Model - contingency plan for hard coding job postings
    """
    title = models.TextField()
    job_url = models.TextField()
    company = models.TextField()
    location = models.TextField()
    posted_date = models.TextField()
    salary = models.TextField()
    time_stamp = models.DateTimeField(default=timezone.now)

    objects = models.Manager()

    def __str__(self):
        return f"Title: {self.title} at: {self.company} located in: {self.location}"
