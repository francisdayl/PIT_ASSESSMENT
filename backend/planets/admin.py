from django.contrib import admin

# Register your models here.
from .models import Planet


@admin.register(Planet)
class PlanetAdmin(admin.ModelAdmin):
    list_display = ("name", "population", "climates", "terrains")
    search_fields = ("name",)
    list_per_page = 20
    ordering = ("name",)
    pass
