from rest_framework import serializers
from .models import Todo, SubTask


# 🔥 SubTask Serializer
class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ['id', 'todo', 'title', 'completed']


# 🔥 Todo Serializer (UPDATED with subtasks)
class TodoSerializer(serializers.ModelSerializer):
    dueDate = serializers.DateField(source='due_date', required=False, allow_null=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    description = serializers.CharField(required=False, allow_blank=True, default='')

    # ✅ ADD THIS LINE (VERY IMPORTANT)
    subtasks = SubTaskSerializer(many=True, read_only=True)

    class Meta:
        model = Todo
        fields = [
            'id',
            'title',
            'description',
            'completed',
            'priority',
            'dueDate',
            'category',
            'createdAt',
            'subtasks'   # ✅ include here
        ]

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance