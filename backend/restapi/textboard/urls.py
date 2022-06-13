from django.urls import include, path
from rest_framework import routers
from restapi.textboard.views import BoardViewSet, PostViewSet, ThreadViewSet
from restapi.userauth.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'boards', BoardViewSet, 'board')
router.register(r'posts', PostViewSet, 'post')
router.register(r'threads', ThreadViewSet, 'thread')
router.register(r'users', UserViewSet, 'user')

urlpatterns = [
    path('', include(router.urls))
]
