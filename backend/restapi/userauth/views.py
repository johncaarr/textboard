from django.utils import timezone
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from restapi.userauth import models, serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_update(self, serializer):
        if self.request.user.id == serializer.data.id or self.request.user.is_staff:
            serializer.save()
