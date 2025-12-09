from rest_framework import serializers
from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')

    class Meta:
        model = Post
        fields = ('pk', 'title', 'category')
