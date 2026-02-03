
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-10 py-3.5 rounded-sm transition-all duration-500 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold active:scale-[0.98] disabled:opacity-30";
  
  const variants = {
    primary: "bg-neutral-900 text-white hover:bg-black shadow-lg shadow-black/5",
    secondary: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
    outline: "border border-neutral-900/10 text-neutral-800 hover:border-neutral-900/30 hover:bg-neutral-50",
    ghost: "text-neutral-400 hover:text-neutral-900 bg-transparent",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
