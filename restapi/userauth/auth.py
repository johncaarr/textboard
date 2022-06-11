from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.authtoken.models import Token

class UserAuthentication(authentication.BaseAuthentication):
  def authenticate(self, request):
    username = request.META.get('HTTP_X_USERAUTH')
    if not username:
      return None
    try:
      user = User.objects.get(username=username)
      token = Token.objects.get_or_create(user=user)
    except User.DoesNotExist:
      raise exceptions.AuthenticationFailed('No such user')
    return (user, None)
