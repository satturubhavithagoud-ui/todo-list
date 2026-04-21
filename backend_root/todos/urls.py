from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, SubTaskViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'subtasks', SubTaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
]
