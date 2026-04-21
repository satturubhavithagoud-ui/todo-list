import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Check, Clock, Trash2, Edit, Star, Plus } from 'lucide-react';

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState('');
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);

  const priorityColors = {
    low: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700' },
    high: { bg: 'bg-rose-50', text: 'text-rose-700' },
  };

  const categoryColors = {
    Design: 'bg-violet-100 text-violet-700',
    Development: 'bg-blue-100 text-blue-700',
    Documentation: 'bg-teal-100 text-teal-700',
    Marketing: 'bg-pink-100 text-pink-700',
    Default: 'bg-slate-100 text-slate-700',
  };

  const priority = priorityColors[todo.priority];
  const categoryColor = categoryColors[todo.category] || categoryColors.Default;

  const handleAdd = () => {
    if (subtaskInput.trim()) {
      onAddSubtask(todo.id, subtaskInput);
      setSubtaskInput('');
      setShowSubtaskInput(false);
    }
  };

  return (
    <div
      className={`
        group relative bg-white rounded-xl border transition-all duration-300
        ${todo.completed ? 'opacity-70' : 'hover:shadow-lg'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">

          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-full border flex items-center justify-center
              ${todo.completed ? 'bg-violet-500 border-violet-500' : 'border-slate-300'}
            `}
          >
            {todo.completed && <Check className="w-4 h-4 text-white" />}
          </button>

          {/* Content */}
          <div className="flex-1">

            {/* Title */}
            <h3 className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.title}
              {todo.priority === 'high' && (
                <Star className="inline w-4 h-4 ml-2 text-red-500" />
              )}
            </h3>

            {/* Description */}
            {todo.description && (
              <p className="text-sm text-gray-500">{todo.description}</p>
            )}

            {/* Badges */}
            <div className="flex gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded ${categoryColor}`}>
                {todo.category}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${priority.bg} ${priority.text}`}>
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span className="text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* 🔥 SUBTASKS LIST */}
            <div className="mt-3">
              {todo.subtasks && todo.subtasks.map(sub => (
                <div key={sub.id} className="flex items-center gap-2 ml-4 mt-1">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => onToggleSubtask(sub.id, !sub.completed)}
                  />
                  <span className={sub.completed ? 'line-through text-gray-400' : ''}>
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>

            {/* ✅ ONLY INPUT (NO BUTTON) */}
            {showSubtaskInput && (
              <input
                type="text"
                placeholder="Add subtask..."
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                }}
                className="ml-4 mt-3 border px-3 py-1.5 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            )}

          </div>

          {/* Actions */}
          <div className={`flex items-center gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>

            {/* ➕ Toggle Input */}
            <Button onClick={() => setShowSubtaskInput(!showSubtaskInput)}>
              <Plus className="w-4 h-4" />
            </Button>

            <Button onClick={() => onEdit(todo)}>
              <Edit className="w-4 h-4" />
            </Button>

            <Button onClick={() => onDelete(todo.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}