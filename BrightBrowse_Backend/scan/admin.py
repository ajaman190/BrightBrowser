from django.contrib import admin
from .models import DarkPatternType, SubDarkPatternType, Scan, Report, Result

# Register your models here.
admin.site.register(DarkPatternType)
admin.site.register(SubDarkPatternType)
admin.site.register(Scan)
admin.site.register(Report)
admin.site.register(Result)
