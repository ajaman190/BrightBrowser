from django.contrib import admin
from .models import UserProfile, Whitelist

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Whitelist)