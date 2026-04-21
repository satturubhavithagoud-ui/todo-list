import { Check, Clock, AlertCircle, TrendingUp } from 'lucide-react';

// total/completed/active/high-priority counts

export function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: TrendingUp,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Completed',
      value: completed,
      icon: Check,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'In Progress',
      value: active,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'High Priority',
      value: highPriority,
      icon: AlertCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="col-span-2 lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Overall Progress</span>
          <span className="text-sm font-bold text-violet-600">{completionRate}%</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

    </div>
  );
}