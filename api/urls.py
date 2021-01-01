from django.urls import path, include
from . import views 

urlpatterns = [
    path('', views.apiOverview, name="Bday Project API Overview"), 
    # User Authentication
    path('auth/', include('djoser.urls')), 
    path('auth/', include('djoser.urls.jwt')),
    # Twins
    path('get_twins/<str:birthday>/', views.getMatchedTwins, name="Get Matched Twins"), 
    path('add_twin/', views.addTwin, name="Add New Twin"), 
    path('my_twins/', views.getMyTwins, name="Get My Twins"), 
    # Cakes
    path('cakes/', views.getCakesByTagSearch, name="Search Cakes by Tags"),
    # Gifts
    path('gifts/', views.getGiftsByTagSearch, name="Search Gifts by Tags"),
    # Purchases
    path('send_order/', views.sendOrder, name="Send Purchase Order to DB"), 
    path('make_payment/', views.makeStripePayment, name="Make Payment to Stripe Account"), 
]