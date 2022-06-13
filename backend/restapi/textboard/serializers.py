from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework import compat, serializers
from rest_framework.validators import UniqueValidator
from restapi.userauth.serializers import UserSerializer
from restapi.textboard.models import Board, Post, Thread


class BoardSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=8, read_only=True)
    description = serializers.CharField(max_length=32, read_only=True)

    def create(self, validated_data):
        board = Board.objects.create(**validated_data)
        return board

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        return instance

    class Meta:
        model = Board
        fields = ['id', 'name', 'description']


class ThreadSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(max_length=64, required=True)
    comment = serializers.CharField(max_length=512, required=True)
    options = serializers.CharField(max_length=128, required=False)
    sticked = serializers.BooleanField(default=False, read_only=True)
    ip_address = serializers.CharField(
        max_length=24, required=True, write_only=True)
    board = BoardSerializer(Board.objects.all(), many=False)
    creator = UserSerializer(many=False, read_only=True)
    editor = UserSerializer(many=False, read_only=True)

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
    options = serializers.CharField(max_length=128, required=False)
    ip_address = serializers.CharField(
        max_length=24, read_only=True)
    thread = ThreadSerializer(Thread.objects.all(), many=False)
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
        fields = ['id', 'ip_address', 'date_created',
                  'date_edited', 'comment', 'options',
                  'creator', 'editor', 'thread']
