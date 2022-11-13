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