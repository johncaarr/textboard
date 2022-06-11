import uuid
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)

class PostModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  username = models.CharField(max_length=32)
  content = models.CharField(max_length=256)
  created = models.DateTimeField()
  editor = models.CharField(max_length=32)
  edited = models.DateTimeField()

  def __str__(self):
    return self.id

class UserModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  username = models.CharField(max_length=32)
  email = models.CharField(max_length=128)
  password = models.CharField(max_length=64)

  def __str__(self):
    return self.id
