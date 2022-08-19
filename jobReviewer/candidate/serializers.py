from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import *


class profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('full_name','contact','status','resume')

class work_serializer(serializers.ModelSerializer):
    class Meta:
        model = work_history
        fields = '__all__'

class education_serializer(serializers.ModelSerializer):
    class Meta:
        model = education_history
        fields = '__all__'
