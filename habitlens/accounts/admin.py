from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import *

# Register your models here.
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ['email', 'name','is_staff','is_active','is_superuser']
    list_filter = ['email','name','is_staff','is_active','is_superuser']

    fieldsets = (
        (None, {'fields': ('password',)}),
        ('Personal info', {'fields': ('name', 'email')}),
        ('Permissions', {'fields': ('is_active','is_staff','is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide,'),
            'fields': ('email', 'password1', 'password2', 'name','is_staff','is_active'),
        }),
    )
    search_fields = ()
    ordering = ()
    filter_horizontal = ()

admin.site.register(User, UserAdmin)