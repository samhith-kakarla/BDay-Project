from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Twin)
admin.site.register(Cake)
admin.site.register(Gift)
admin.site.register(Purchase)
admin.site.register(Image)