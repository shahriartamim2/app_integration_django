# Generated by Django 4.0.10 on 2024-03-31 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mswm', '0002_alter_mswmsite_site_type_alter_vehicle_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vehicle',
            name='landfill_site',
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='sts_site',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='site_vehicles', to='mswm.mswmsite'),
        ),
    ]
