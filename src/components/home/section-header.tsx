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
    <div className={cn("flex items-center gap-3 mb-4 border-r-4 pr-4", className)} style={{ borderColor: accentColor }}>
      {Icon && <Icon className="h-6 w-6" style={{ color: accentColor }} />}
      <h2 className="text-2xl font-bold text-card-foreground font-headline">{title}</h2>
    </div>
  );
}
