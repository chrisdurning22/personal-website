from django.urls import path
from .views import SectionsList, SectionDetail

urlpatterns = [
    path('sections', SectionsList.as_view()),
    path('section/<int:pk>/', SectionDetail.as_view()),
]