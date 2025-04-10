from decimal import Decimal
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PlanetSerializer
from .models import Planet
import requests

# Create your views here.
class PlanetView(viewsets.ModelViewSet):
    serializer_class = PlanetSerializer
    queryset = Planet.objects.all()

    @action(detail=False, methods=["get"])
    def seed(self, request):
        Planet.objects.all().delete()
        url = "https://swapi-graphql.netlify.app/graphql"
        headers = {"Content-Type": "application/json"}
        query = """
        query AllPlanets {
            allPlanets {
                totalCount
                planets {
                    name
                    population
                    terrains
                    climates
                }
            }
        }
        """
        payload = {"query": query}
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        planets = data["data"]["allPlanets"]["planets"]
        Planet.objects.bulk_create(
            [
                Planet(
                    name=planet["name"],
                    population=Decimal(planet["population"])
                    if planet["population"]
                    else None,
                    climates=planet["climates"],
                    terrains=planet["terrains"],
                )
                for planet in planets
                if planet.get("name", None)
            ]
        )

        return JsonResponse(data={"message": "ok", "status": 200})
