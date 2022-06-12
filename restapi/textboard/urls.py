from django.urls import include, path
from rest_framework import routers
from restapi.textboard.views import PostViewSet, ThreadViewSet
from restapi.userauth.tokens import UserAuthToken
from restapi.userauth.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'threads', ThreadViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]
