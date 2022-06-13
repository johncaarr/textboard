from django.db import models
from django.conf import settings
from django.utils import timezone
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Board(models.Model):
    name = models.CharField(max_length=8)
    description = models.CharField(max_length=32)


class Post(models.Model):
    comment = models.CharField(max_length=512)
    options = models.CharField(max_length=128, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    thread = models.ForeignKey(
        'textboard.Thread',
        on_delete=models.CASCADE,
        related_name='parent_thread')
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='post_creator',
        editable=False)
    editor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='post_editor',
        editable=False)

    class Meta:
        ordering = ['-id']


class Thread(models.Model):
    subject = models.CharField(max_length=64)
    comment = models.CharField(max_length=512)
    options = models.CharField(max_length=128, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(
        'textboard.Board',
        on_delete=models.CASCADE,
        related_name='parent_board')
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='thread_creator',
        editable=False)
    editor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='thread_editor',
        editable=False)

    class Meta:
        ordering = ['-id']
