from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from restapi.userauth.tokens import UserAuthToken
from restapi.userauth.views import PostViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
  path('', include(router.urls)),
  path('admin/', admin.site.urls),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  path('user-token/', UserAuthToken.as_view()),
]
