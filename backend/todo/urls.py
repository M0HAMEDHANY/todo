from django import views
from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
from .views import TodoViewSet, get_csrf_token
from rest_framework import routers
# from .views import register

router = routers.DefaultRouter()
router.register("todo", TodoViewSet, basename="todo")

urlpatterns = [
    path("api/csrf-token/", get_csrf_token, name="csrf-token"),
    # path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("api/register/", register, name="register"),
]

urlpatterns += router.urls
