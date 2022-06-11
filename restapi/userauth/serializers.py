from rest_framework import serializers
from restapi.userauth.models import PostModel, UserModel
from restapi.userauth.classes import Post, User
from datetime import datetime

class PostSerializer(serializers.ModelSerializer):
  id = serializers.UUIDField(format='hex_verbose')
  username = serializers.CharField(max_length=32)
  content = serializers.CharField(max_length=256)
  created = serializers.DateTimeField()
  editor = serializers.CharField(allow_blank=True)
  edited = serializers.DateTimeField()

  def create(self, validated_data):
    return Post(**validated_data)

  def update(self, instance, validated_data):
    # instance.id = validated_data.get('id', instance.id)
    instance.username = validated_data.get('username', instance.username)
    instance.content = validated_data.get('content', instance.content)
    instance.created = validated_data.get('created', instance.created)
    instance.editor = validated_data.get('editor', instance.editor)
    instance.edited = validated_data.get('edited', instance.edited)
    instance.save()
    return instance

  def save(self):
    self.validated_data['edited'] = datetime.now()

  class Meta:
    model = PostModel
    fields = ['id', 'username', 'content', 'created', 'editor', 'edited']

class UserSerializer(serializers.ModelSerializer):
  id = serializers.UUIDField(format='hex_verbose')
  username = serializers.CharField(max_length=32)
  email = serializers.CharField(max_length=128)
  password = serializers.CharField(max_length=64)

  def create(self, validated_data):
    return User(**validated_data)

  def update(self, instance, validated_data):
    # instance.id = validated_data.get('id', instance.id)
    instance.username = validated_data.get('username', instance.username)
    instance.email = validated_data.get('email', instance.email)
    instance.password = validated_data.get('password', instance.password)
    instance.save()
    return instance

  class Meta:
    model = UserModel
    fields = ['id', 'username', 'email', 'password']
