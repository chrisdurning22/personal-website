from django.test import TestCase
from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase

# Create your tests here.
class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')

        user_data = {
            'name': 'email',
            'email': 'email@gmail.com',
            'password': 'password'
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()


class TestViews(TestSetUp):
    def test_user_registration_with_no_user_data(self):
        response = self.client.post(self.register_url)
        self.assertEqual(response.status_code, 400)