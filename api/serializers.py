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

# Twins

class TwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags')

class CreateTwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags', 'match')

class GetTwinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags', 'match')

class SetTwinMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'match')

class AddImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'twin')

class GetTwinImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'twin')

class AddTwinImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'images')

# Cakes

class GetCakesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cake
        fields = ('id', 'name', 'price', 'tag')

# Purchases

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('id', 'cake_id', 'address')

class GetPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('id', 'cake_id', 'address', 'complete')

class fulfillPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('id', 'complete')