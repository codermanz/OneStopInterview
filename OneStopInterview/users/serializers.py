from rest_framework import serializers
from .models import User


class RegisterUserSerializer(serializers.ModelSerializer):
    """
        Currently unused in preference of the below.
    """

    class Meta:
        model = User
        fields = ('email', 'user_name', 'first_name', 'last_name',
                  'password', 'progress_percentage')
        extra_kwargs = {'password': {'write_only': True},
                        'progress_percentage': {'read_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    """
        Serializes info for sending to user
    """
    class Meta:
        model = User
        fields = ('email', 'user_name', 'first_name', 'last_name',
                  'password', 'progress_percentage')
        extra_kwargs = {'password': {'write_only': True},
                        'progress_percentage': {'read_only': True}}


class UserClearProgressSerializer(serializers.ModelSerializer):
    """
        Serializes data for clearing progress
    """
    class Meta:
        model = User
        fields = ('progress_percentage',)
        extra_kwargs = {'progress_percentage': {'read_only': True}}
