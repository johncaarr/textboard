from django.db import models
from django.conf import settings
from django.utils import timezone
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(models.signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
