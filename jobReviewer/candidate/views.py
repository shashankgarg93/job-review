from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from .serializers import *
from .models import *
# Create your views here.


@api_view(['GET'])
def get_candidates(request):
    if(request.method=='GET'):
        try:
            profile_list = Profile.objects.all()
            final_data = []
            for data in profile_list:
                serializer = profile_serializer(data)
                final_data.append(serializer.data)
            return JsonResponse({'message':final_data})
        except:
            return JsonResponse({"message":"failure"})

@api_view(['GET'])
def get_candidate_detail(request):
    if(request.method=='GET'):
        try:
            phone_no = request.query_params.get('contact')
            profile = Profile.objects.filter(contact=str(phone_no))
            final_data = []
            if(profile.count()==0):
                return JsonResponse({'message':final_data})
            edhistory = education_history.objects.filter(ref_profile = profile[0])
            workhistory = work_history.objects.filter(ref_profile = profile[0])


            serializer = profile_serializer(profile[0])
            final_data.append(serializer.data)
            if(workhistory.count()>0):
                serializer = work_serializer(workhistory[0])
                final_data.append(serializer.data)
            if(edhistory.count()>0):
                serializer = education_serializer(edhistory[0])
                final_data.append(serializer.data)
            return JsonResponse({'message':final_data})
        except:
            return JsonResponse({"message":"failure"})

@api_view(['POST'])
def update_status(request):
    if(request.method=='POST'):
        try:
            req_data = request.data
            phone_no = req_data['contact']
            updated_status = req_data['status']
            profile = Profile.objects.filter(contact = str(phone_no))
            profile.update(status=str(updated_status))
            return JsonResponse({'message':'success'})
        except:
            return JsonResponse({"message":"failure"})


@api_view(['POST'])
def update_status(request):
    if(request.method=='POST'):
        try:
            req_data = request.data
            phone_no = req_data['contact']
            updated_status = req_data['status']
            profile = Profile.objects.filter(contact = str(phone_no))
            profile.update(status=str(updated_status))
            return JsonResponse({'message':'success'})
        except:
            return JsonResponse({"message":"failure"})
