from django.urls import path, include


from .views import AdminLoginView, CustomTokenView
# upload_media
from . import views


urlpatterns = [
   # path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
   path("o/token/", CustomTokenView.as_view(), name="token"),
   path("admin-login/", AdminLoginView.as_view(), name="admin-login"),
  
]
