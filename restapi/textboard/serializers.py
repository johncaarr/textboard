from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework import compat, serializers
from rest_framework.validators import UniqueValidator
from restapi.userauth.serializers import UserSerializer
from restapi.textboard.models import Post, Thread


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
