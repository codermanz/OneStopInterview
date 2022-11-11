from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer, UserSerializer, UserClearProgressSerializer
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status, generics
from .models import User
from django.apps import apps


class CustomUserCreate(APIView):
    """
        View that registers a user
        Endpoints that use this view:
            - /api/user/register/
    """
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        """
            Create a user
        """
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserPermissions(BasePermission):
    """
        Permission which allows user to only request their own
        progress
    """
    message = 'Can only access user information when logged in'

    def has_object_permission(self, request, view, obj):
        # If object author is same as request user, return true
        # else not authenticated
        return obj.id == request.user.id


class UserObject(APIView, GetUserPermissions):
    """
        This view gets a user object
        Endpoints that use this view:
            - /api/user/userInfo/
    """
    permission_classes = [GetUserPermissions]
    serializer_class = UserSerializer

    def get(self, request, format='json'):
        """
            Gets User object if user exists and is authenticated
        """
        try:
            # Check to see if user exists
            queryset = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            raise ValidationError(detail='User doesn\'t exist')

        serializer = self.serializer_class(queryset, many=False)
        return Response(serializer.data)


class ClearUserProgress(generics.UpdateAPIView):
    """
        This view clears user progress
        Endpoints that uses this view:
            - api/user/clearProgress/
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserClearProgressSerializer

    def update(self, request, *args, **kwargs):
        # Clear table of completed questions
        model = apps.get_model('api', 'UserProgress')
        model.objects.filter(user_id=request.user).delete()

        # Reset progress attribute to zero
        user_object = User.objects.get(id=self.request.user.id)
        user_object.progress_percentage = 0
        user_object.save()
        return Response("Cleared Progress", status=status.HTTP_202_ACCEPTED)


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
