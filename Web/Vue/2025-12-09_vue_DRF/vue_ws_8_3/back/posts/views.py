from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from .serializers import PostListSerializer
from .models import Post

# Create your views here.
@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializers = PostListSerializer(posts, many=True)
        return Response(serializers.data)
    elif request.method == 'POST':
        serializer = PostListSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)