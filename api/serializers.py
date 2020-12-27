from rest_framework import serializers
from .models import *

# User & Authentication Serializers



# REST Serializers

class CreateTwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags')

class GetTwinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twin
        fields = ('id', 'name', 'age', 'birthday', 'address', 'gift_tags', 'cake_tags')