from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from restapi.userauth import tokens, views

router = routers.DefaultRouter()
router.register(r'threads', views.ThreadViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', tokens.UserAuthToken.as_view()),
]
