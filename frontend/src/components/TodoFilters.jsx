import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

// search input (filters by title, description, category)
// All / Active / Completed tab buttons

const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({ filter, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white rounded-xl border border-slate-200 p-4">
      
      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-slate-200 focus:border-violet-400 focus:ring-violet-400"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 rounded-lg p-1">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(f.value)}
            className={`
              px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${filter === f.value
                ? 'bg-white text-violet-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
              }
            `}
          >
            {f.label}
          </Button>
        ))}
      </div>

    </div>
  );
}