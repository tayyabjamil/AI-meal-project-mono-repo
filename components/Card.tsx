import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const variantClasses = {
    default: 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700',
    elevated: 'bg-white dark:bg-slate-800 shadow-md shadow-slate-200 dark:shadow-slate-900',
    flat: 'bg-slate-50 dark:bg-slate-900',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <View
      className={`rounded-3xl ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
