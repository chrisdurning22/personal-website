from django.db import models
from users.models import User

class Section(models.Model):
    title = models.CharField(max_length=70)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)