from django.contrib import admin
from .models import (
    Student, Parent, Teacher,
    AttendanceRecord, Assessment,
    Schedule, NonAcademicRecord, MeetingLog, Subject
)

admin.site.register(Student)
admin.site.register(Parent)
admin.site.register(Teacher)
admin.site.register(AttendanceRecord)
admin.site.register(Assessment)
admin.site.register(Schedule)
admin.site.register(NonAcademicRecord)
admin.site.register(MeetingLog)
admin.site.register(Subject)

