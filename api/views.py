from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

# CREATE VIEWS HERE

@api_view(['GET'])
def apiOverview(request):
    # Returns all API Endpoints
    return Response(data={
        "Get Matched Twins": "get_twins/<str:birthday>/", 
        "Add New Twin": "add_twin/", 
        "Update Twin with Images": "update_twin/<int:pk>/", 
        "Get My Twins": "my_twins/", 
    })

@api_view(['GET'])
def getMatchedTwins(request, birthday):
    twins = Twin.objects.filter(birthday=birthday)
    serializer = GetTwinsSerializer(twins, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def addTwin(request):
    twin = request.data
    serializer = CreateTwinSerializer(data=twin)

    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data)
    else:
        return Response(data={
            "failure": "Twin not added"
        })





