from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from .models import SubTask
from .serializers import SubTaskSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializer



class SubTaskViewSet(viewsets.ModelViewSet):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerializer