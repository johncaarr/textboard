# Generated by Django 4.0.5 on 2022-06-13 07:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('textboard', '0002_alter_board_description_alter_board_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='board',
            options={'ordering': ['-id']},
        ),
    ]
