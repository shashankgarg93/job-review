from django.db import models

class Profile(models.Model):
    full_name = models.CharField(max_length=200)
    contact = models.CharField(primary_key= True,max_length=10)
    resume = models.FileField(upload_to='media/', null=True, blank=True)
    status = models.CharField(max_length=15, default = "Applied")

class education_history(models.Model):
    ref_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, db_constraint=False)
    passing_year = models.CharField(max_length=5)
    school = models.CharField(max_length=512)
    degree = models.CharField(max_length=512)
    cgpa = models.DecimalField(max_digits = 5,decimal_places = 2)

class work_history(models.Model):
    ref_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, db_constraint=False)
    startYear = models.CharField(max_length=5)
    endYear = models.CharField(max_length=5)
    company = models.CharField(max_length=512)
    work_exp = models.TextField()
    designation = models.CharField(max_length=100)
