from django.utils import timezone
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from restapi.textboard import models, serializers


def get_ip_address(view_set):
    ip_address = 'localhost'
    x_forwarded_for = view_set.request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip_address = x_forwarded_for.split(',')[0]
    else:
        ip_address = view_set.request.META.get('REMOTE_ADDR')
    return ip_address


class BoardAccessPermission(permissions.BasePermission):
    message = 'Bad request'

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class BoardViewSet(viewsets.ModelViewSet):
    queryset = models.Board.objects.all()
    serializer_class = serializers.BoardSerializer
    permission_classes = [BoardAccessPermission]


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        current_time = timezone.now()
        ip_address = get_ip_address(self)
        serializer.save(
            ip_address=ip_address,
            creator_id=self.request.user.id,
            editor_id=self.request.user.id)

    def perform_update(self, serializer):
        instance.save(editor_id=self.request.user)


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = models.Thread.objects.all()
    serializer_class = serializers.ThreadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        current_time = timezone.now()
        ip_address = get_ip_address(self)
        serializer.save(
            sticked=False,
            ip_address=ip_address,
            creator_id=self.request.user.id,
            editor_id=self.request.user.id)

    def perform_update(self, serializer):
        instance.save(editor_id=self.request.user.id)
