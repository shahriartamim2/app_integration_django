# Generated by Django 4.0.10 on 2024-03-30 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='permission',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='role',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='role',
            name='permissions',
            field=models.ManyToManyField(blank=True, related_name='roles', to='accounts.permission'),
        ),
    ]
