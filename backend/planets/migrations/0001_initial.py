# Generated by Django 5.2 on 2025-04-10 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Planet",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                (
                    "population",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=20, null=True
                    ),
                ),
                ("climates", models.CharField(blank=True, max_length=100, null=True)),
                ("terrains", models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                "verbose_name": "Planet",
                "verbose_name_plural": "Planets",
                "db_table": "planet",
                "ordering": ["name"],
            },
        ),
    ]
