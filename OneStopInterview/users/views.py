from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserPermissions(BasePermission):

    message = 'Can only access user information when logged in'

    def has_object_permission(self, request, view, obj):
        # If object author is same as request user, return true
        # else not authenticated
        return obj.author == request.user


class UserObject(APIView, GetUserPermissions):
    permission_classes = [GetUserPermissions]

    def post(self, request, format='json'):
        pass

    def get(self, request, format='json'):
        pass
