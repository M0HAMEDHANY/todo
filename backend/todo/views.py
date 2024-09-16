from django.shortcuts import render
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


# @api_view(["POST"])
# def register(request):
#     username = request.data.get("username")
#     password = request.data.get("password")

#     if User.objects.filter(username=username).exists():
#         return Response(
#             {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
#         )

#     user = User.objects.create_user(username=username, password=password)
#     refresh = RefreshToken.for_user(user)

#     return Response(
#         {
#             "refresh": str(refresh),
#             "access": str(refresh.access_token),
#         }
#     )
