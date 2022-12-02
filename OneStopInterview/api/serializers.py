from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    """
        Serializer for Post class
    """

    class Meta:
        model = models.Post
        fields = ('id', 'title', 'body', 'parent_post', 'author', 'time_stamp')
        extra_kwargs = {'id': {'read_only': True},
                        'author': {'read_only': True}}


class QuestionCategorySerializer(serializers.ModelSerializer):
    """
        Serializer for QuestionCategory class
    """
    class Meta:
        model = models.QuestionCategory
        fields = ('name',)


class TechBehQuestionSerializer(serializers.ModelSerializer):
    """
        Serializer for TechBehQuestions
    """
    class Meta:
        model = models.TechBehQuestion
        fields = ('id', 'question_category', 'question_name',
                  'question_description', 'question_url')


class UserProgress(serializers.ModelSerializer):
    """
        Serializer for user progress table
    """
    class Meta:
        model = models.UserProgress
        fields = ('user_id', 'question_id')
        extra_kwargs = {'user_id': {'read_only': True}}


class JobPosting(serializers.Serializer): # noqa
    """
        Serializer for scraped job posting data from indeed
    """
    title = serializers.CharField()
    job_url = serializers.CharField()
    company = serializers.CharField()
    location = serializers.CharField()
    posted_date = serializers.CharField()
    salary = serializers.CharField()


class JobPostingStatic(serializers.ModelSerializer):
    """
        Serializer for Job Posting model (statically saved job postings)
        ONLY USE AS CONTINGENCY PLAN
    """
    class Meta:
        model = models.JobPosting
        fields = ('title', 'job_url', 'company', 'location', 'posted_date', 'salary', 'time_stamp')
        extra_kwargs = {'title': {'read_only': True},
                        'job_url': {'read_only': True},
                        'company': {'read_only': True},
                        'location': {'read_only': True},
                        'posted_date': {'read_only': True},
                        'salary': {'read_only': True},
                        'time_stamp': {'read_only': True}}
