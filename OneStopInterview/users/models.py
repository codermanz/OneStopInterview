from django.db import models
from django.utils import timezone
# Allows for translation of specified fields
from django.utils.translation import gettext_lazy
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomerAccountManager(BaseUserManager):

    def create_user(self, email, user_name, first_name, last_name, password, **other_fields):
        if not email:
            raise ValueError(gettext_lazy('Must provide an email address'))
        if not user_name:
            raise ValueError(gettext_lazy('Must provide a username'))
        if not first_name:
            raise ValueError(gettext_lazy('Must provide a first name'))
        if not last_name:
            raise ValueError(gettext_lazy('Must provide a last name'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, user_name, first_name, last_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, last_name, password, **other_fields)


class NewUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(gettext_lazy('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    start_date = models.DateTimeField(default=timezone.now)
    progress_percentage = models.IntegerField(default=0)
    about = models.TextField(gettext_lazy('about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomerAccountManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self):
        return self.user_name
