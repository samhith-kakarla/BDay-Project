from django.test import TestCase, SimpleTestCase, Client
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model

from . import views
from .models import * 
from .serializers import *

client = Client()

# VIEW TESTING
class TestTwinViews(TestCase):
    
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(
            name="Micheal", email="micheal@gmail.com", password="1234"
        )
        Twin.objects.create(
            name="Twin1", owner=self.user, age=15, birthday="2003-12-22", address="address 1"
        )
     
    def test_getMatchedTwins(self):
        response = client.get(reverse('Get Matched Twins', args=['2003-12-22']))
        twins = Twin.objects.filter(birthday="2003-12-22")
        serializer = GetTwinsSerializer(twins, many=True)
        
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

    def test_addTwin(self):
        twin = {
            "name": "Twin 3", 
            "age": 15, 
            "birthday": "2003-11-10", 
            "address": "Address 2"
        }

        response = client.post(reverse('Add New Twin'), data=twin, content_type="application/json")

        self.assertEquals(response.status_code, 200)

    def test_getMyTwins(self):
        response = client.get(reverse('Get My Twins'))
        twins = Twin.objects.filter(owner=self.user)
        serializer = GetTwinsSerializer(twins, many=True)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

    def test_updateTwin(self):
        update_twin = {
            "name": "Twin 2", 
            "age": 16,
        }

        response = client.post(reverse('Update Twin Info', args=[1]), data=update_twin, content_type="application/json")

        self.assertEquals(response.status_code, 200)

    def test_deleteTwin(self):
        response = client.get(reverse('Delete Twin', args=[1]))
        twin.delete()

        self.assertEquals(response.status_code, 200)
        self.assertEquals(twin.DoesNotExist, True)

    def test_setTwinMatch(self):
        update_twin = {
            "match": ["samhith.kakarla@gmail.com"]
        }

        response = client.post(reverse('Update Twin Info', args=[1]), data=update_twin, content_type="application/json")
        twin = Twin.objects.get(id=1)
        serializer = SetTwinMatchSerializer(instance=twin, data=update_twin)
        serializer.is_valid()

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

    def test_addImagesToTwin(self):
        image_file_1 = File(open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd_AuYtI07.png', 'rb'))
        image_file_2 = File(open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd.png'))
        images = [image_file_1, image_file_2]
        
        response = client.post(reverse('Add Images To Twin', args=[1]), data=images, content_type="application/json")
        
        self.assertEquals(response.status_code, 200)

    def test_getTwinImages(self):
        twin = Twin.objects.get(id=1)
        image_file_1 = File(open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd_AuYtI07.png', 'rb'))
        image_file_2 = File(open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd.png'))
        Image.objects.create(image=image_file_2, twin=twin)
        Image.objects.create(image=image_file_2, twin=twin)

        response = client.get(reverse('Get Twin Images', args=[1]))
        images = Image.objects.filter(twin=twin)
        serializer = GetTwinImagesSerializer(images, many=True)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

class TestCakeViews(TestCase):
    pass
        
class TestPurchaseViews(TestCase):
    pass

# FUNCTION TESTING


# MODEL TESTING


# URL TESTING

class TestUrls(SimpleTestCase):
    
    def test_api_overview_url(self):
        url = reverse('Bday Project API Overview')
        self.assertEquals(resolve(url).func, views.apiOverview)
    
    # Twin URL Tests

    def test_get_twins_url(self):
        url = reverse('Get Matched Twins', args=['2003-12-22'])
        self.assertEquals(resolve(url).func, views.getMatchedTwins)
    
    def test_add_twin_url(self):
        url = reverse('Add New Twin')
        self.assertEquals(resolve(url).func, views.addTwin)
    
    def test_get_my_twins_url(self):
        url = reverse('Get My Twins')
        self.assertEquals(resolve(url).func, views.getMyTwins)

    def test_update_twin_url(self):
        url = reverse('Update Twin Info', args=[1])
        self.assertEquals(resolve(url).func, views.updateTwin)

    def test_update_twin_images_url(self):
        url = reverse('Add Images to Twin', args=[1])
        self.assertEquals(resolve(url).func, views.addImagesToTwin)

    def test_get_twin_images_url(self):
        url = reverse('Get Twin Images', args=[1])
        self.assertEquals(resolve(url).func, views.getTwinImages)

    def test_delete_twin_url(self):
        url = reverse('Delete Twin', args=[1])
        self.assertEquals(resolve(url).func, views.deleteTwin)

    def test_set_twin_match_url(self):
        url = reverse('Set Twin Match', args=[1])
        self.assertEquals(resolve(url).func, views.setTwinMatch)

    # Cake URL Tests

    def test_get_cakes_by_tag_search_url(self):
        url = reverse('Search Cakes by Tags')
        self.assertEquals(resolve(url).func, views.getCakesByTagSearch)

    # Purchase URL Tests

    def test_send_order_url(self):
        url = reverse('Send Purchase Order to DB')
        self.assertEquals(resolve(url).func, views.sendOrder)

    def test_send_payment_url(self):
        url = reverse('Make Payment to Stripe Account')
        self.assertEquals(resolve(url).func, views.makeStripePayment)

    def test_get_orders_url(self):
        url = reverse('Get All Orders')
        self.assertEquals(resolve(url).func, views.getOrders)

    def test_fulfill_order_url(self):
        url = reverse('Fulfill Order', args=[1])
        self.assertEquals(resolve(url).func, views.fulfillOrder)

