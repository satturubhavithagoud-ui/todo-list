const API_BASE_URL = 'http://localhost:8000/api';

// normalize id to string
function normalize(data) {
  return { ...data, id: String(data.id) };
}

export const api = {
  // GET all todos
  async getTodos() {
    const res = await fetch(`${API_BASE_URL}/todos/`);
    if (!res.ok) throw new Error('Failed to fetch todos');

    const data = await res.json();
    return data.map(normalize);
  },

  // CREATE todo
  async createTodo(todo) {
    const payload = {
      title: todo.title,
      completed: todo.completed ?? false,
      priority: todo.priority,
      category: todo.category,
    };

    if (todo.description) payload.description = todo.description;
    if (todo.dueDate) payload.dueDate = todo.dueDate;

    const res = await fetch(`${API_BASE_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Create todo failed:', err);
      throw new Error('Failed to create todo');
    }

    const data = await res.json();
    return normalize(data);
  },

  // UPDATE todo
  async updateTodo(id, updates) {
    const payload = { ...updates };

    delete payload.id;
    delete payload.createdAt;

    const res = await fetch(`${API_BASE_URL}/todos/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Update todo failed:', err);
      throw new Error('Failed to update todo');
    }

    const data = await res.json();
    return normalize(data);
  },

  // DELETE todo
  async deleteTodo(id) {
    const res = await fetch(`${API_BASE_URL}/todos/${id}/`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};