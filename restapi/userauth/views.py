from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from restapi.userauth.models import PostModel, UserModel
from restapi.userauth.serializers import PostSerializer, UserSerializer

class PostViewSet(viewsets.ModelViewSet):
  queryset = PostModel.objects.all()
  serializer_class = PostSerializer
  permission_classes = []

class UserViewSet(viewsets.ModelViewSet):
  queryset = UserModel.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.IsAuthenticated]
