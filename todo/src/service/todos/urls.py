from django.urls import path
from .views import TodoList, TodoDetail, FilteredTodoList

urlpatterns = [
    path('todos/', TodoList.as_view(), name='todo-list'),  # Liste des tâches et création de nouvelle tâche
    path('todos/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),  # Détail, modification et suppression d'une tâche
    path('todos/filter/', FilteredTodoList.as_view(), name='filtered-todo-list'),
]
