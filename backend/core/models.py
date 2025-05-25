# core/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=100)

    def __str__(self):
        return self.user.get_full_name()


class Subject(models.Model):  # Renamed to singular
    subject_name = models.CharField(max_length=100)
    subject_code = models.CharField(max_length=20, unique=True)
    subject_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.subject_name}"

class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    reg_number = models.CharField(max_length=20, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    parent_name = models.CharField(max_length=100, blank=True, null=True)
    parent_phone_number = models.CharField(max_length=15, blank=True, null=True)
    guardian_name = models.CharField(max_length=100, blank=True, null=True)
    guardian_phone_number = models.CharField(max_length=15, blank=True, null=True)
    enrollment_date = models.DateTimeField(default=timezone.now)
    grade = models.CharField(max_length=10, blank=True, null=True)
    section = models.CharField(max_length=10, blank=True, null=True)
    subjects = models.ManyToManyField(Subject, blank=True)  # Correct ManyToManyField
    assigned_teacher = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    occupation = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.get_full_name()

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)

    def __str__(self):
        return self.user.get_full_name()

class AttendanceRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    present = models.BooleanField(default=False)
    method = models.CharField(max_length=20, choices=[('QR', 'QR'), ('Fingerprint', 'Fingerprint')])

    class Meta:
        unique_together = ('student', 'date')

    def __str__(self):
        return f"{self.student} - {self.date}"

class Assessment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    score = models.FloatField()
    max_score = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.student}"

class Schedule(models.Model):
    title = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    weekday = models.IntegerField(choices=[(i, day) for i, day in enumerate(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])])

    def __str__(self):
        return f"{self.title} ({self.get_weekday_display()})"

class NonAcademicRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    category = models.CharField(max_length=50, choices=[
        ('Behavior', 'Behavior'),
        ('Goals', 'Goals'),
        ('Skills', 'Skills'),
        ('Interests', 'Interests'),
        ('Quran', 'Quran'),
        ('Language', 'Language'),
    ])
    notes = models.TextField()

    def __str__(self):
        return f"{self.student} - {self.category}"

class MeetingLog(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    participants = models.TextField()  # Could include teacher/parent names
    action_points = models.TextField()

    def __str__(self):
        return f"Meeting - {self.student} - {self.date}"



