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
    path('update_twin/<int:pk>/', views.updateTwin, name="Update Twin Info"), 
    path('update_twin_images/<int:pk>/', views.addImagesToTwin, name="Add Images to Twin"), 
    path('get_twin_images/<int:twin>/', views.getTwinImages, name="Get Twin Images"), 
    path('delete_twin/<int:pk>/', views.deleteTwin, name="Delete Twin"), 
    path('set_twin_match/<int:pk>/', views.setTwinMatch, name="Set Twin Match"), 
    # Cakes
    path('cakes/', views.getCakesByTagSearch, name="Search Cakes by Tags"),
    # Purchases
    path('send_order/', views.sendOrder, name="Send Purchase Order to DB"), 
    path('make_payment/', views.makeStripePayment, name="Make Payment to Stripe Account"), 
]