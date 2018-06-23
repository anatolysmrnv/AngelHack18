from socialapis.models import Meetups
from sensordata.models import SensorData
from socialapis.serializers import MeetupsSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

def processing_function(request, meetups):
	sensordata_objects = SensorData.objects.filter(userid = request.user)
	all_sensor_readings = list(sensordata_objects)
	print(all_sensor_readings)
	
	needed_location_x = 51.0
	needed_location_y = 0.0
	x_window = 1.0
	y_window = 1.0

	relevant_meetups = Meetups.objects.filter(meetup_locationx__gte = (needed_location_x - x_window)).filter(meetup_locationx__lte = (needed_location_x + x_window)).filter(meetup_locationy__gte = (needed_location_y - y_window)).filter(meetup_locationy__lte = (needed_location_y + y_window))
	all_meetups = list(relevant_meetups)
	print(all_meetups)

	return relevant_meetups


class MeetupsList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        meetups = Meetups.objects.all()
        relevant_meetups = processing_function(request, meetups)
        serializer = MeetupsSerializer(relevant_meetups, many=True)
        return Response(serializer.data)



# class MeetupsDetail(APIView):
#     """
#     Retrieve, update or delete a snippet instance.
#     """
#     def get_object(self, pk):
#         try:
#             return Meetups.objects.get(pk=pk)
#         except Meetups.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         meetups = self.get_object(pk)
#         serializer = MeetupsSerializer(snippet)
#         return Response(serializer.data)