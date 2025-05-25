# core/serializers.py
from rest_framework import serializers

from .models import (
    Student, Parent, Teacher,
    AttendanceRecord, Assessment,
    Schedule, NonAcademicRecord, MeetingLog, Subject
)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class AttendanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceRecord
        fields = '__all__'

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class NonAcademicRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonAcademicRecord
        fields = '__all__'

class MeetingLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingLog
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

