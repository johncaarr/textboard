# Generated by Django 4.0.5 on 2022-06-13 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('textboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='description',
            field=models.CharField(editable=False, max_length=32),
        ),
        migrations.AlterField(
            model_name='board',
            name='name',
            field=models.CharField(editable=False, max_length=8),
        ),
    ]
