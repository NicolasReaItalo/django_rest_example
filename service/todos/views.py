from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer
from django.shortcuts import get_object_or_404

class TodoList(APIView):
    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetail(APIView):
    def get(self, request, pk):
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, pk):
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        todo = get_object_or_404(Todo, pk=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FilteredTodoList(APIView):
    def get(self, request):
        # Récupérer le paramètre de requête 'completed'
        completed_param = request.query_params.get('completed')

        # Vérifier si le paramètre est fourni et s'il est valide
        if completed_param is not None:
            # Convertir le paramètre en booléen
            is_completed = completed_param.lower() == 'true'
            # Filtrer les tâches en fonction du paramètre
            todos = Todo.objects.filter(completed=is_completed)
        else:
            # Si aucun paramètre n'est fourni, retourner toutes les tâches
            todos = Todo.objects.all()

        # Sérialiser et retourner les données
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
