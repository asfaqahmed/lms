# core/views.py
from rest_framework import viewsets

from .models import (
    Student, Parent, Teacher,
    AttendanceRecord, Assessment,
    Schedule, NonAcademicRecord, MeetingLog, Subject
)
from .serializers import (
    StudentSerializer, ParentSerializer, TeacherSerializer,
    AttendanceRecordSerializer, AssessmentSerializer,
    ScheduleSerializer, NonAcademicRecordSerializer, MeetingLogSerializer, SubjectSerializer
)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.all()
    serializer_class = AttendanceRecordSerializer

class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class NonAcademicRecordViewSet(viewsets.ModelViewSet):
    queryset = NonAcademicRecord.objects.all()
    serializer_class = NonAcademicRecordSerializer

class MeetingLogViewSet(viewsets.ModelViewSet):
    queryset = MeetingLog.objects.all()
    serializer_class = MeetingLogSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
