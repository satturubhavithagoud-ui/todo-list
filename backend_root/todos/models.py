from django.db import models

class Todo(models.Model):
    PRIORITY_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    due_date = models.DateField(null=True, blank=True)
    category = models.CharField(max_length=100, default='General')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class SubTask(models.Model):
    todo = models.ForeignKey('Todo', on_delete=models.CASCADE, related_name='subtasks')
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title