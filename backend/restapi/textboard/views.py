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
        queryset = models.Post.objects.all()
        board = self.request.query_params.get('board')
        post = self.request.query_params.get('post')
        thread = self.request.query_params.get('thread')
        if board:
            board_obj = models.Board.objects.get(name=board)
            if post:
                return queryset.filter(thread__board=board_obj, id=post)
            elif thread:
                thread_obj = \
                    models.Thread.objects.get(board=board_obj, id=thread)
                return queryset.filter(thread__board=board_obj, thread=thread_obj)
            else:
                return queryset.filter(thread__board=board_obj)
        return queryset

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
        queryset = models.Thread.objects.all()
        board = self.request.query_params.get('board')
        thread = self.request.query_params.get('thread')
        if board:
            board_obj = models.Board.objects.get(name=board)
            if thread:
                return queryset.filter(board=board_obj, id=thread)
            else:
                return queryset.filter(board=board_obj)
        return queryset

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
