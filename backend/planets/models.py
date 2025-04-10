from django.db import models

# Create your models here.


class Planet(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    population = models.DecimalField(
        max_digits=20, decimal_places=2, null=True, blank=True
    )
    climates = models.CharField(max_length=100, null=True, blank=True)
    terrains = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "planet"
        ordering = ["name"]
        verbose_name = "Planet"
        verbose_name_plural = "Planets"
