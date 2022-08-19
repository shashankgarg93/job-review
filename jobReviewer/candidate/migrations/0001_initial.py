# Generated by Django 4.1 on 2022-08-15 12:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('full_name', models.CharField(max_length=200)),
                ('contact', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('resume', models.FileField(blank=True, null=True, upload_to='resumes')),
                ('status', models.CharField(default='Applied', max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='work_history',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startYear', models.CharField(max_length=5)),
                ('endYear', models.CharField(max_length=5)),
                ('company', models.CharField(max_length=512)),
                ('work_exp', models.TextField()),
                ('designation', models.CharField(max_length=100)),
                ('ref_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidate.profile')),
            ],
        ),
        migrations.CreateModel(
            name='education_history',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('passing_year', models.CharField(max_length=5)),
                ('school', models.CharField(max_length=512)),
                ('degree', models.CharField(max_length=512)),
                ('cgpa', models.DecimalField(decimal_places=2, max_digits=5)),
                ('ref_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidate.profile')),
            ],
        ),
    ]
