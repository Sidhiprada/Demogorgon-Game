from django.shortcuts import render, redirect
from .models import GameRoom, Player
import random
import string
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def lobby(request):

    return render(request,"lobby.html")
def create_room(request):

    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

    room = GameRoom.objects.create(code=code)

    return redirect(f"/join-room/?room_code={code}")
def join_room(request):

    if request.method == "POST":

        room_code = request.POST["room_code"]

        name = request.POST["player_name"]

        room = GameRoom.objects.get(code=room_code)

        player = Player.objects.create(
            name=name,
            room=room
        )
        players = Player.objects.filter(room=room)

        if players.count() == 1:
            player.role = "demogorgon"
        else:
            player.role = "agent"

        player.save()

        request.session["player_id"] = str(player.id)

        return redirect(f"/game/{room_code}/")

    else:

        room_code = request.GET.get("room_code","")

        return render(request,"join.html",{"room_code":room_code})
def game_view(request, room_code):

    return render(request, "game.html", {"room_code": room_code})
@csrf_exempt
def update_location(request):

    if request.method == "POST":

        data = json.loads(request.body)

        player_id = request.session.get("player_id")

        player = Player.objects.get(id=player_id)

        player.latitude = data["lat"]
        player.longitude = data["lon"]

        player.save()

        return JsonResponse({"status":"ok"})

def get_players(request, room_code):

    players = Player.objects.filter(room__code=room_code)

    data = []

    for p in players:
        data.append({
            "name": p.name,
            "lat": p.latitude,
            "lon": p.longitude,
            "role": p.role
        })

    return JsonResponse({"players": data})
