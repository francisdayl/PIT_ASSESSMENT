from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from planets import views

router = routers.DefaultRouter()
router.register(r"planet", views.PlanetView, "planet")

urlpatterns = [
    path("planet/", include(router.urls)),
    path("docs/", include_docs_urls(title="Planets API")),
]
