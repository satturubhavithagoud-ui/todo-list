import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { X, Plus } from 'lucide-react';

// create tasks

const priorities = ['low', 'medium', 'high'];
const categories = ['Design', 'Development', 'Documentation', 'Marketing', 'Other'];

export function TodoForm({ onSubmit, onCancel, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [category, setCategory] = useState(initialData?.category || 'Development');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setPriority(initialData.priority);
      setCategory(initialData.category);
      setDueDate(initialData.dueDate || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate: dueDate || undefined,
      completed: initialData?.completed || false,
    });

    if (!initialData) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('Development');
      setDueDate('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        <div className="space-y-2">
          <Label htmlFor="title" className="text-slate-700 font-medium">Task Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="border-slate-200 focus:border-violet-400 focus:ring-violet-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            className="border-slate-200 focus:border-violet-400 focus:ring-violet-400 min-h-20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Priority</Label>
            <div className="flex gap-1">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`
                    flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                    ${priority === p
                      ? p === 'high'
                        ? 'bg-rose-500 text-white'
                        : p === 'medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }
                  `}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-slate-700 font-medium">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border-slate-200 focus:border-violet-400 focus:ring-violet-400"
            />
          </div>

        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            {initialData ? 'Update Task' : 'Create Task'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6 border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>
        </div>

      </form>
    </div>
  );
}