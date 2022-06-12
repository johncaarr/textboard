from django.db import models
from django.conf import settings
from django.utils import timezone
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(models.signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Thread(models.Model):
    subject = models.CharField(max_length=64)
    comment = models.CharField(max_length=512)
    options = models.CharField(max_length=128, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
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


class Post(models.Model):
    comment = models.CharField(max_length=512)
    options = models.CharField(max_length=128, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    thread = models.ForeignKey(
        'userauth.Thread',
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
