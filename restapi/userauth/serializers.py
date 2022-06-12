from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import compat, serializers
from rest_framework.validators import UniqueValidator
from restapi.userauth.models import Post, Thread


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


class ThreadSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(max_length=64, required=True)
    comment = serializers.CharField(max_length=512, required=True)
    options = serializers.CharField(max_length=128, required=False)
    creator = UserSerializer(many=False, read_only=True)
    editor = UserSerializer(many=False, read_only=True)

    def create(self, validated_data):
        thread = Thread.objects.create(**validated_data)
        return thread

    def update(self, instance, validated_data):
        instance.subject = validated_data.get('subject', instance.subject)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.options = validated_data.get('options', instance.options)
        return instance

    class Meta:
        model = Thread
        fields = ['id', 'creator', 'editor', 'date_created',
                  'date_edited', 'subject', 'comment', 'options']


class PostSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(max_length=512, required=True)
    options = serializers.CharField(max_length=128, required=False)
    thread = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Thread.objects.all())
    creator = UserSerializer(many=False, read_only=True)
    editor = UserSerializer(many=False, read_only=True)

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.options = validated_data.get('options', instance.options)
        return instance

    class Meta:
        model = Post
        fields = ['id', 'creator', 'editor', 'date_created',
                  'date_edited', 'comment', 'options', 'thread']
