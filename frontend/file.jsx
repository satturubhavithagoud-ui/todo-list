const API_BASE_URL = 'http://localhost:8000/api';

function normalize(data) {
  return { ...data, id: String(data.id) };
}

export const api = {
  async getTodos() {
    const res = await fetch(`${API_BASE_URL}/todos/`);
    if (!res.ok) throw new Error('Failed to fetch todos');

    const data = await res.json();
    return data.map(normalize);
  }
};