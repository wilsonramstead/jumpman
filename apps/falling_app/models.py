from django.db import models

class Highscore(models.Model):
    name = models.CharField(max_length=45)
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)