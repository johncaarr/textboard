from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework import compat, serializers
from rest_framework.validators import UniqueValidator
from restapi.userauth.serializers import UserSerializer
from restapi.textboard.models import Board, Post, Thread


class BoardSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=8, read_only=True)
    verbose = serializers.CharField(max_length=32, read_only=True)
    description = serializers.CharField(max_length=64, read_only=True)

    class Meta:
        model = Board
        fields = ['id', 'name', 'verbose', 'description']


class ThreadSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(max_length=64, required=True)
    comment = serializers.CharField(max_length=512, required=True)
    options = serializers.CharField(
        max_length=128, required=False, allow_blank=True, allow_null=True)
    sticked = serializers.BooleanField(default=False, read_only=True)
    board = BoardSerializer(many=False, read_only=True)
    # serializers.SlugRelatedField(many=False,
    # queryset=Board.objects.all(), slug_field='name')
    creator = UserSerializer(many=False, read_only=True)
    editor = UserSerializer(many=False, read_only=True)
    ip_address = serializers.HiddenField(default='::0')

    def create(self, validated_data):
        thread = Thread.objects.create(**validated_data)
        return thread

    def update(self, instance, validated_data):
        instance.subject = validated_data.get('subject', instance.subject)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.options = validated_data.get('options', instance.options)
        instance.sticked = validated_data.get('sticked', instance.sticked)
        return instance

    class Meta:
        model = Thread
        fields = ['id', 'ip_address', 'date_created',
                  'date_edited', 'board', 'subject', 'comment',
                  'options', 'sticked', 'creator', 'editor']


class PostSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(max_length=512, required=True)
    options = serializers.CharField(
        max_length=128, required=False, allow_blank=True, allow_null=True)
    thread = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Thread.objects.all())
    creator = UserSerializer(many=False, read_only=True)
    editor = UserSerializer(many=False, read_only=True)
    ip_address = serializers.HiddenField(default='::0')
    thread = ThreadSerializer(many=False)

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.options = validated_data.get('options', instance.options)
        return instance

    class Meta:
        model = Post
        fields = ['id', 'ip_address', 'date_created',
                  'date_edited', 'comment', 'options',
                  'creator', 'editor', 'thread']
