from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('restapi.textboard.urls')),
    path('api/v1/auth/', include('restapi.userauth.urls')),
]
