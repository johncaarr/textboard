from django.urls import include, path
from restapi.userauth.tokens import UserAuthToken

urlpatterns = [
    path('', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', UserAuthToken.as_view())
]
