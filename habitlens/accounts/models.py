from django.db import models
from tkinter import CASCADE
from django.contrib.auth.models import AbstractUser
from accounts.manager import UserManager

# Create your models here.
class User(AbstractUser):
    username=None

    # extra fields
    email = models.EmailField(("Email Address"), primary_key=True, unique=True)
    name = models.CharField(max_length = 30, unique=True, blank=True)
    # grad_year = models.IntegerField(blank=True, null =True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]

    objects = UserManager()

    def __str__(self):
        return self.email
