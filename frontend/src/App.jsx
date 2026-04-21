import { useState, useEffect } from 'react';
import { api } from './utils/api';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { TodoStats } from './components/TodoStats';
import { TodoFilters } from './components/TodoFilters';
import { Button } from './components/ui/button';
import { Plus, ListTodo, AlertCircle } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
      setError(null);
    } catch {
      setError('Cannot connect to Django server. Make sure it is running: python manage.py runserver');
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (todoData) => {
    try {
      await api.createTodo(todoData);
      await loadTodos();
      setIsFormOpen(false);
      setError(null);
    } catch {
      setError('Failed to create task. Make sure Django server is running.');
    }
  };

  const handleUpdate = async (todoData) => {
    if (!editingTodo) return;
    try {
      await api.updateTodo(editingTodo.id, todoData);
      await loadTodos();
      setEditingTodo(null);
      setIsFormOpen(false);
      setError(null);
    } catch {
      setError('Failed to update task. Make sure Django server is running.');
    }
  };

  const handleToggle = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      try {
        await api.updateTodo(id, { completed: !todo.completed });
        await loadTodos();
      } catch {
        setError('Failed to update task.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTodo(id);
      await loadTodos();
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      const q = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(q) ||
        (todo.description?.toLowerCase().includes(q) ?? false) ||
        (todo.category?.toLowerCase().includes(q) ?? false)
      );
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">TaskFlow</h1>
                <p className="text-xs text-slate-500">Organize your work efficiently</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setEditingTodo(null);
                setIsFormOpen(true);
              }}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-xl shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>

          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">{error}</p>
              <button
                onClick={() => { setError(null); loadTodos(); }}
                className="text-xs underline mt-1 hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8">
          <TodoStats todos={todos} />
        </div>

        {/* Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
              <TodoForm
                onSubmit={editingTodo ? handleUpdate : handleCreate}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingTodo(null);
                }}
                initialData={editingTodo}
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <ListTodo className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">No tasks found</h3>
            <p className="text-slate-400 mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first task to get started'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}