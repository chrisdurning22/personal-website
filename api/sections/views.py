from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SectionSerializer
from api.utils import check_and_validate_token
from .models import Section
import jwt # this can be removed

class SectionsList(APIView):

    # returns sections for user 1 - no need to authenticate (unauth users can view my sections on load of home page)
    def get(self, request):
        sections = Section.objects.filter(user_id=1)
        serializer = SectionSerializer(sections, many=True)
        ordering_fields = ['id']
        return Response(serializer.data)

    # may be needed in future 
    # def get(self, request):
    #     payload = check_and_validate_token(request) # validates user
    #     sections = Section.objects.filter(user_id=payload['id']); # returns only the the sections related to the logged in user
    #     serializer = SectionSerializer(sections, many=True)
    #     return Response(serializer.data)

    def post(self, request):
        payload = check_and_validate_token(request)
        post_data = {
            'user': payload["id"],
            'title': request.data["title"],
            'content': request.data["content"]
        }
        serializer = SectionSerializer(data=post_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SectionDetail(APIView):
    def get_object(self, pk):
        try:
            return Section.objects.get(pk=pk)
        except Section.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        check_and_validate_token(request)
        section = self.get_object(pk)
        serializer = SectionSerializer(section)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        payload = check_and_validate_token(request)
        section = self.get_object(pk)
        put_data = {
            'id': pk,
            'user': payload["id"],
            'title': request.data["title"],
            'content': request.data["content"]
        }
        serializer = SectionSerializer(section, data=put_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # api/section/1/ (note that forward slash needed at the very end)
    def delete(self, request, pk, format=None):
        check_and_validate_token(request)
        section = self.get_object(pk)
        section.delete()
        response = Response()
        response.data = {
            'message': 'successfully deleted'
        }
        return response