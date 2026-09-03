"""
URL configuration for velocity project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView

urlpatterns = [
    path('velocity_webtech_solution/api/admin/', admin.site.urls),
    re_path(
        r'^api/admin/(?P<path>.*)$',
        RedirectView.as_view(
            url='/velocity_webtech_solution/api/admin/%(path)s',
            permanent=False,
        ),
    ),
    path('api/accounts/', include('accounts.urls') ),
    path('api/velocity-webtech/', include('velocity_webtech.urls')),

]
