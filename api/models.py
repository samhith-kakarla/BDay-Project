from django.db import models
from djangotoolbox.fields import ListField
from django.contrib.auth import get_user_model
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, Group

# CREATE MODELS HERE

# User
class UserProfileManager(BaseUserManager):
    def _create_user(self, name, email, birthday, is_operator, password=None):
        if not email:
            raise(ValueError("Must provide an email address"))
        email = self.normalize_email(email)
        user = self.model(name=name, email=email, birthday=birthday, isOperator=isOperator)
        user.set_password(password)
        user.save()
        if is_operator:
            operator = Group.objects.get(name="Operator")
            operator.user_set.add(user)
        return user
    def create_user(self, name, email, birthday, password):
        user = self._create_user(name, email, birthday, False, password)
        user.save()
        return user
    def create_operator(self, name, email, birthday, password):
        user = self._create_user(name, email, birthday, True, password)
        user.save()
        return user

class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=500)
    birthday = models.DateField(auto_now=False, auto_now_add=False)
    is_operator = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'birthday']

    def __str__(self):
        return self.email

# Data 

class Twin(models.Model):
    name = models.CharField(max_length=200, blank=False, null=True)
    age = models.IntegerField(blank=False, null=True)
    birthday = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=True)
    address = models.CharField(max_length=500, blank=False, null=True)
    gift_tags = ListField()
    cake_tags = ListField()

    def __str__(self):
        return self.name

class Cake(models.Model):
    tag = models.CharField(max_length=200, blank=False, null=True)
    name = models.CharField(max_length=200, blank=False, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=True)

    def __str__(self):
        return str(self.name) + ": $" + str(self.price)

class Gift(models.Model):
    tag = models.CharField(max_length=200, blank=False, null=True)
    name = models.CharField(max_length=200, blank=False, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=True)

class Purchase(models.Model):
    pass

