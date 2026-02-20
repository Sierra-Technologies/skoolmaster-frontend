from django.db import models


class TimetableEntry(models.Model):
    DAY_CHOICES = (
        ("Monday", "Monday"), ("Tuesday", "Tuesday"), ("Wednesday", "Wednesday"),
        ("Thursday", "Thursday"), ("Friday", "Friday"), ("Saturday", "Saturday"), ("Sunday", "Sunday"),
    )

    school = models.ForeignKey("schools.School", on_delete=models.CASCADE, related_name="timetable_entries")
    classroom = models.ForeignKey("academics.ClassRoom", on_delete=models.CASCADE, related_name="timetable_entries")
    subject = models.ForeignKey("academics.Subject", on_delete=models.SET_NULL, null=True, blank=True, related_name="timetable_entries")
    teacher = models.ForeignKey("teachers.Teacher", on_delete=models.SET_NULL, null=True, blank=True, related_name="timetable_entries")
    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    period = models.PositiveIntegerField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50, blank=True, default="")
    academic_year = models.CharField(max_length=20, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "timetable"
        ordering = ["day", "period"]
        unique_together = ("classroom", "day", "period", "academic_year")

    def __str__(self):
        return f"{self.classroom} - {self.day} Period {self.period}"
