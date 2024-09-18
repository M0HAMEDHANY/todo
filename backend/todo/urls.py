from django.urls import path
from rest_framework import routers
from .views import TodoViewSet, register, login

router = routers.DefaultRouter()
router.register("todo", TodoViewSet, basename="todo")

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
]

urlpatterns += router.urls
