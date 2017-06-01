from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from bs4 import BeautifulSoup


API = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';


@api_view(['GET'])
def index(request):
    return render(request, 'api/index.html')


@api_view(['GET'])
def get_quote(request):
    response = requests.get(API)
    if response.status_code == 200:
        json = response.json()[0]
        soup = BeautifulSoup(json['content'], 'html.parser')
        json['text'] = soup.get_text()
        return Response(json, 200)
    return Response(400)


