from django.utils import timezone
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from restapi.textboard import models, serializers


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = models.Thread.objects.all()
    serializer_class = serializers.ThreadSerializer
    permission_classes = []

    def perform_create(self, serializer):
        current_time = timezone.now()
        serializer.save(
            creator_id=self.request.user.id,
            editor_id=self.request.user.id)

    def perform_update(self, serializer):
        instance.save(editor_id=self.request.user.id)
        # instance.save(date_edited=timezone.now())


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = []

    def perform_create(self, serializer):
        current_time = timezone.now()
        serializer.save(
            creator_id=self.request.user.id,
            editor_id=self.request.user.id)

    def perform_update(self, serializer):
        instance.save(editor_id=self.request.user)
        # instance.save(date_edited=timezone.now())
