from django.db import models
from django.conf import settings
from django.utils import timezone
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Board(models.Model):
    name = models.CharField(max_length=8, editable=False)
    verbose = models.CharField(max_length=32, editable=False)
    description = models.CharField(max_length=64, editable=False)

    def __str__(self):
        return '({0}) /{1}/'.format(self.id, self.name)

    class Meta:
        ordering = ['-id']


class Post(models.Model):
    comment = models.CharField(max_length=512)
    options = models.CharField(max_length=128, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    ip_address = models.GenericIPAddressField(
        default='localhost', protocol='IPv6', editable=False)
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

    def __str__(self):
        return '/{0}/{1}#p{2}'.format(self.thread.board.name, self.thread.id, self.id)

    class Meta:
        ordering = ['-id']


class Thread(models.Model):
    sticked = models.BooleanField(default=False)
    subject = models.CharField(max_length=64)
    comment = models.CharField(max_length=512)
    options = models.CharField(max_length=128, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    ip_address = models.GenericIPAddressField(
        default='localhost', protocol='IPv6', editable=False)
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

    def __str__(self):
        return '/{0}/{1}'.format(self.board.name, self.id)

    class Meta:
        ordering = ['-id']
