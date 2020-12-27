from django.urls import path
from . import views 

urlpatterns = [
    path('', views.apiOverview, name="Bday Project API Overview"), 
    # User Authentication

    # Twins
    path('get_twins/<str:birthday>/', views.getMatchedTwins, name="Get Matched Twins"), 
    path('add_twin/', views.addTwin, name="Add New Twin"), 
    # Cakes

    # Gifts

    # Purchases
]