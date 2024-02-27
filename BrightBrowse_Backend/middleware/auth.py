from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth.models import User
import jwt
import os

SECRET = os.getenv('JWT_SECRET_KEY')
ALGO = 'HS256'

class Authentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1] 

            if not token:
                raise exceptions.AuthenticationFailed('Unauthenticated')
            
            payload = self.decode_token(token)
            user = self.get_user(payload)
            self.validate_user(user)
            
            return (user, None)
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))

    def decode_token(self, token):
        try:
            return jwt.decode(token, SECRET, algorithms=ALGO)
        except jwt.InvalidSignatureError:    
            raise exceptions.AuthenticationFailed('Token Invalid')
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token Expired')
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing')
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))

    def get_user(self, payload):
        user = User.objects.filter(id=int(payload['id'])).first()
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid token')
        return user

    def validate_user(self, user):
        if not user.is_active:
            raise exceptions.AuthenticationFailed('Your account has not been activated yet')

