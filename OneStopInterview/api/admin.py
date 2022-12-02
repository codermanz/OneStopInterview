from django.contrib import admin
from . import models


# Register your models here.
admin.site.register(models.QuestionCategory)
admin.site.register(models.TechBehQuestion)
admin.site.register(models.Post)
admin.site.register(models.UserProgress)
admin.site.register(models.JobPosting)
