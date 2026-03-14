from django.db import models
import uuid
# Create your models here.
class GameRoom(models.Model):

    code = models.CharField(max_length=10, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)

class Player(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=100)

    role = models.CharField(max_length=20, default="agent")

    latitude = models.FloatField(null=True, blank=True)

    longitude = models.FloatField(null=True, blank=True)

    last_update = models.DateTimeField(auto_now=True)

    room = models.ForeignKey(GameRoom, on_delete=models.CASCADE)