import { forwardRef } from 'react';

export const Input = forwardRef(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
);

Input.displayName = 'Input';