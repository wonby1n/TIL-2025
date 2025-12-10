from rest_framework import serializers
from .models import Post, Category, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username',)

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class PostListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('pk', 'user', 'title', 'category')


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class CommentSerialzer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = '__all__'

    comment_set = CommentSerialzer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
        
class CommentSerialzer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostListSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'