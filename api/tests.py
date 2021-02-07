from django.test import TestCase, SimpleTestCase, Client, TransactionTestCase
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model
from celery.contrib.testing.worker import start_worker

from . import views
from .models import * 
from .serializers import *
from .tasks import send_emails_to_everyone
from backend.celery import app

import stripe

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
        Cake.objects.create(
            name="Cake1", tag="tag1", price=5.00
        )
        Cake.objects.create(
            name="Cake2", tag="tag2", price=5.00
        )
        Cake.objects.create(
            name="Cake3", tag="cake3", price=5.00
        )
        Purchase.objects.create(
            address="address1", cake_id=1, complete=False
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
        twin = Twin.objects.get(id=1)
        serializer = TwinSerializer(instance=twin, data=update_twin)
        serializer.is_valid()

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

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
        image_file_1 = open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd_AuYtI07.png', 'rb')
        image_file_2 = open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd.png', 'rb')
        images = [image_file_1, image_file_2]
        
        response = client.post(reverse('Add Images To Twin', args=[1]), data=images, content_type="application/json")
        
        self.assertEquals(response.status_code, 200)

    def test_getTwinImages(self):
        twin = Twin.objects.get(id=1)
        image_file_1 = open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd_AuYtI07.png', 'rb')
        image_file_2 = open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd.png', 'rb')
        Image.objects.create(image=image_file_2, twin=twin)
        Image.objects.create(image=image_file_2, twin=twin)

        response = client.get(reverse('Get Twin Images', args=[1]))
        images = Image.objects.filter(twin=twin)
        serializer = GetTwinImagesSerializer(images, many=True)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

class TestCakeViews(TestCase):

    def test_getCakesByTagSearch(self):
        tags_1 = ["tag1", "tag2", "tag3"]
        tags_2 = ["tag2", "tag3"]
        response_1 = [
            { "name": "Cake1", "tag": "tag1", "price": 5.00 }, 
            { "name": "Cake2", "tag": "tag2", "price": 5.00 }, 
            { "name": "Cake3", "tag": "tag3", "price": 5.00 }
        ]
        response_2 = [
            { "name": "Cake2", "tag": "tag2", "price": 5.00 }, 
            { "name": "Cake3", "tag": "tag3", "price": 5.00 }
        ]

        response = client.get(reverse('Search Cakes by Tags'))
        cakes_1 = []
        cakes_2 = []
        for tag in tags_1:
            cakes = Cake.objects.filter(tag=tag)
            cakes_1.append(cakes)
        for tag in tags_2:
            cakes = Cake.objects.filter(tag=tag)
            cakes_2.append(cakes_2)
        serializer_1 = GetCakesSerializer(cakes_1, many=True)
        serializer_2 = GetCakesSerializer(cakes_2, many=True)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(serializer_1.data, response_1)
        self.assertEquals(serializer_2.data, response_2)
        
class TestPurchaseViews(TestCase):
    
    def test_sendOrder(self):
        purchase = {
            "cake_id": 1, 
            "address": "address 1", 
            "complete": False
        }

        response = client.post(reverse('Send Purchase Order to DB'), data=purchase, content_type="application/json")

        self.assertEquals(response.status_code, 200)

    def test_makeStripePayment(self):
        purchase_data = {
            amount: 50000, 
            cake_amount: 40000, 
            email: "samhith.kakarla@gmail.com"
        }

        response = client.post(reverse('Make Payment to Stripe Account'), data=purchase_data, content_type="application/json")
        payment_intent = stripe.PaymentIntent.create(
            amount=request.data["amount"],
            currency="usd", 
            payment_method_types=["card"], 
            receipt_email=request.data["email"],
        )

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, payment_intent)

    def test_getOrders(self):
        response = client.get(reverse('Get All Orders'))
        purchases = Purchase.objects.all()
        serializer = GetPurchaseSerializer(purchases, many=True)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)

    def test_fulfillOrder(self):
        purchase_update = {
            "complete": True
        }

        response = client.post(reverse('Fulfill Order', args=[1]), data=purchase_update, content_type="application/json")
        purchase = Purchase.objects.get(id=1)
        serializer = FulfillPurchaseSerializer(instance=purchase, data=purchase_update)
        serializer.is_valid()

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, serializer.data)


# FUNCTION TESTING

class TestAutomatedEmails(TransactionTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.celery_worker = start_worker(app)
        cls.celery_worker.__enter__()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

        cls.celery_worker.__exit__(None, None, None)

    def setUp(self):
        super().setUp()

        self.task = send_emails_to_everyone.delay()
        self.results = self.task.get()
    
    def test_send_emails_to_everyone_task(self):
        self.assertEquals(self.task.status, "SUCESS")


# MODEL TESTING

class TestModels(TestCase):

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(
            name="Micheal", email="micheal@gmail.com", password="1234"
        )
        self.twin = Twin.objects.create(
            name="Twin1", owner=self.user, age=15, birthday="2003-12-22", address="address 1"
        )
        self.image_file = open('../images/twin_images/238-2388681_telephone-icon-grey-blue-transparent-phone-icon-hd_AuYtI07.png', 'rb')

    def test_user_model(self):
        self.assertEquals(str(self.user), "micheal@gmail.com")
    
    def test_twin_model(self):
        twin = Twin.objects.create(
            name="Twin2", owner=self.user, age=16, birthday="2003-11-08", address="address 2"
        )

        self.assertEquals(str(twin), twin.name)
        self.assertEquals(Twin.objects.get(name="Twin2").DoesNotExist, False)

    def test_cake_model(self):
        cake = Cake.objects.create(
            name="Cake1", tag="tag1", price=6.00, image=self.image_file
        )

        self.assertEquals(str(cake), cake.name + ": $" + cake.price)
        self.assertEquals(Cake.objects.get(name="Cake1").DoesNotExist, False)

    def test_image_model(self):
        image = Image.objects.create(
            twin=self.twin, image=self.image_file
        )

        self.assertEquals(str(image), image.twin + " " + "Image")
        self.assertEquals(Image.objects.get(twin=self.twin).DoesNotExist, False)

    def test_purchase_model(self):
        purchase = Purchase.objects.create(
            address="Address1", cake_id=1, complete=False
        )

        self.assertEquals(str(purchase), purchase.cake_id + " " + purchase.address + " " + purchase.complete)
        self.assertEquals(Purchase.objects.get(cake_id=1).DoesNotExist, False)


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

