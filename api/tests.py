from unittest import TestCase, mock
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class TestIndexView(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.user = User(username='test')

    @classmethod
    def tearDownClass(cls):
        User.objects.all().delete()

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_unauthenticated_get_index(self):
        self.client.force_authenticate(user=None)
        response = self.client.get('/maidbot/api/')
        self.assertEqual(401, response.status_code)

    def test_authenticated_get_index(self):
        response = self.client.get('/maidbot/api/')
        self.assertEqual(200, response.status_code)
        self.assertTrue(b'html' in response.content)


class TestQuoteView(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.user = User(username='test')

    @classmethod
    def tearDownClass(cls):
        User.objects.all().delete()

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_unauthenticated_get_quote(self):
        self.client.force_authenticate(user=None)
        response = self.client.get('/maidbot/api/quotes/')
        self.assertEqual(401, response.status_code)

    def test_authenticated_get_quote(self):
        response = self.client.get('/maidbot/api/quotes/')
        self.assertEqual(200, response.status_code)
