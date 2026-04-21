import { forwardRef } from 'react';

export const Button = forwardRef(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      default: 'bg-slate-900 text-white hover:bg-slate-800',
      ghost: 'hover:bg-slate-100 text-slate-700',
      outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
    };

    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-11 px-8 text-base',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';