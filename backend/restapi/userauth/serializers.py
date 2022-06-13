from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import compat, serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=32, required=True)
    password = serializers.CharField(
        required=True, write_only=True,
        validators=[validate_password])
    email = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())])
    date_joined = serializers.DateTimeField(
        default=serializers.CreateOnlyDefault(timezone.now), read_only=True)
    is_staff = serializers.BooleanField(default=False, read_only=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password',
                  'date_joined', 'is_staff', 'is_active']
