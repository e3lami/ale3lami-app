import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  accentColor?: string;
  className?: string;
}

export default function SectionHeader({ title, icon: Icon, accentColor, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-6 border-r-4 pr-4", className)} style={{ borderColor: accentColor || 'hsl(var(--primary))' }}>
      {Icon && <Icon className="h-6 w-6" style={{ color: accentColor || 'hsl(var(--primary))' }} />}
      <h2 className="text-xl font-bold text-foreground font-headline">{title}</h2>
    </div>
  );
}
