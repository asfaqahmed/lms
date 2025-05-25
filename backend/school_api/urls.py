from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core import views

router = routers.DefaultRouter()
router.register(r'students', views.StudentViewSet)
router.register(r'parents', views.ParentViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'attendance', views.AttendanceViewSet)
router.register(r'assessments', views.AssessmentViewSet)
router.register(r'schedules', views.ScheduleViewSet)
router.register(r'nonacademic', views.NonAcademicRecordViewSet)
router.register(r'meetings', views.MeetingLogViewSet)
router.register(r'subjects', views.SubjectViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
