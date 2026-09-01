from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from oauth2_provider.views import TokenView
from django.http import JsonResponse
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class CustomTokenView(TokenView):
   def post(self, request, *args, **kwargs):
       response = super().post(request, *args, **kwargs)
      
       # Check if the response is successful
       if response.status_code == 200:
           # Parse the response content as JSON
           token_data = json.loads(response.content)
          
           # Retrieve the user object
           username = request.POST.get('username')
           if username:
               try:
                   user = User.objects.get(username=username)
                   token_data['is_superuser'] = user.is_superuser  # Add is_superuser to the response
               except User.DoesNotExist:
                   token_data['is_superuser'] = False  # Default to False if the user does not exist
          
           # Return the modified response
           return JsonResponse(token_data, status=response.status_code)


       return response


class AdminLoginView(APIView):
   authentication_classes = []
   permission_classes = []

   def post(self, request):
       username = request.data.get("username")
       password = request.data.get("password")

       if not username or not password:
           return Response(
               {"message": "Username and password are required."},
               status=status.HTTP_400_BAD_REQUEST,
           )

       user = authenticate(request, username=username, password=password)

       if not user:
           return Response(
               {"message": "Invalid username or password."},
               status=status.HTTP_401_UNAUTHORIZED,
           )

       if not user.is_superuser:
           return Response(
               {"message": "Only superusers can access this dashboard."},
               status=status.HTTP_403_FORBIDDEN,
           )

       return Response(
           {
               "message": "Admin login successful.",
               "is_superuser": True,
               "user": {
                   "id": user.id,
                   "username": user.username,
                   "email": user.email,
               },
           },
           status=status.HTTP_200_OK,
       )
