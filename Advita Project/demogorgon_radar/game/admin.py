from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import GameRoom, Player

admin.site.register(GameRoom)
admin.site.register(Player)