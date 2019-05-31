from django.conf.urls import url
from . import views
                    
urlpatterns = [
    url(r'^$', views.index),   #Inital load screen
    url(r'^game$', views.game), #route to game
    url(r'^highscores$', views.highscores), #route to show highscores
    url(r'^checkhigh$', views.checkhigh), #route to check if new high
    url(r'^newhigh$', views.newhigh), #enter new high score
    url(r'^posthigh$', views.posthigh), #POST for new high
    url(r'^instructions$', views.instructions), #Instructions page
    # url(r'^options$', views.options), #change options - if implemented
  

]
