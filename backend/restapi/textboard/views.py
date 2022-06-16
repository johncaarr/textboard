from django.shortcuts import render
from django.db.models import Prefetch
from django.contrib.auth.models import User
from rest_framework import generics, mixins, permissions, viewsets
from restapi.textboard import models, serializers
from restapi.textboard.permissions import BoardAccessPermission


def get_ip_address(view_set):
    ip_address = 'localhost'
    x_forwarded_for = view_set.request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip_address = x_forwarded_for.split(',')[0]
    else:
        ip_address = view_set.request.META.get('REMOTE_ADDR')
    return ip_address


class BoardViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.BoardSerializer
    permission_classes = [BoardAccessPermission]

    def get_queryset(self):
        queryset = models.Board.objects.all()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name=name)
        return queryset


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        board = self.request.query_params.get('board')
        post = self.request.query_params.get('post')

        post_queryset = models.Post.objects.all()
        board_obj = models.Board.objects.get(name=board)

        if board and post:
            return post_queryset.filter(board=board_obj, id=post)
        elif board:
            return post_queryset.filter(board=board_obj)

        return post_queryset

    def perform_create(self, serializer):
        ip_address = get_ip_address(self)
        serializer.save(
            ip_address=ip_address,
            creator_id=self.request.user.id,
            editor_id=self.request.user.id)

    def perform_update(self, serializer):
        if self.request.user.is_staff:
            serializer.save(editor_id=self.request.user.id)


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = models.Thread.objects.all()
    serializer_class = serializers.ThreadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        board = self.request.query_params.get('board')
        thread = self.request.query_params.get('thread')

        thread_queryset = models.Thread.objects.all()
        board_obj = models.Board.objects.get(name=board)

        if board and thread:
            return thread_queryset.filter(board=board_obj, id=thread)
        elif board:
            return thread_queryset.filter(board=board_obj)

        return thread_queryset

    def perform_create(self, serializer):
        ip_address = get_ip_address(self)
        serializer.save(
            sticked=False,
            ip_address=ip_address,
            creator_id=self.request.user.id,
            editor_id=self.request.user.id)

    def perform_update(self, serializer):
        if self.request.user.is_staff:
            serializer.save(editor_id=self.request.user.id)
