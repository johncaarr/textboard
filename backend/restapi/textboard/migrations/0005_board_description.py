# Generated by Django 4.0.5 on 2022-06-14 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('textboard', '0004_rename_description_board_verbose'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='description',
            field=models.CharField(default='Message board', editable=False, max_length=64),
            preserve_default=False,
        ),
    ]
