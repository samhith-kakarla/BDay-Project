from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import *

# User & Authentication Serializers
class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = get_user_model()
        fields = ('id', 'name', 'email', 'password')

# REST Serializers

class CreateTwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags')

class GetTwinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags')