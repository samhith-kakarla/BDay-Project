from django.test import TestCase, SimpleTestCase
from django.urls import reverse, resolve
from . import views

# VIEW TESTING


# FUNCTION TESTING


# MODEL TESTING


# URL TESTING

class TestUrls(SimpleTestCase):
    def test_api_overview_url(self):
        url = reverse('Bday Project API Overview')
        self.assertEquals(resolve(url).func, views.apiOverview)
    
    # Auth URL Tests

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

