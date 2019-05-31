from django.shortcuts import render, redirect
from .models import Highscore
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from django.shortcuts import render, HttpResponse
def index(request):
    return render(request, "falling_app/index.html")

def highscores(request):
    highscores = Highscore.objects.order_by('-score')[:8]
    context = {
        "highscores": highscores
    }
    return render(request, "falling_app/highscores.html", context)

@csrf_exempt
def checkhigh(request): 
    highscore = int(request.POST["score"])
    request.session['score'] = highscore
    target = Highscore.objects.order_by('-score')[:8]
    print(highscore)
    if highscore >= target[7].score:
        return render(request, "falling_app/highscores.html")
    return redirect("/")

def game(request):
    return render(request, "falling_app/game.html")    

def newhigh(request):
    return render(request, "falling_app/newhigh.html")    

def posthigh(request):
    Highscore.objects.create(name=request.POST["name"],score=request.session['score'])
    return redirect("/highscores")

def instructions(request):
    return render(request, "falling_app/instructions.html")

