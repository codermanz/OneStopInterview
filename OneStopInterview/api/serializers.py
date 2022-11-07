from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    """
        Serializer for Post class
    """

    class Meta:
        model = models.Post
        fields = ['id', 'title', 'body', 'parent_post_id', 'author', 'time_stamp']
        read_only_fields = ['id']


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
        fields = ('question_category', 'question_name',
                  'question_description', 'question_url')
