import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggle = () =>
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');

    return (
        <button
            onClick={toggle}
            className={cn(
                'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-accent',
                className,
            )}
            aria-label={
                resolvedAppearance === 'dark'
                    ? 'Ativar tema claro'
                    : 'Ativar tema escuro'
            }
        >
            <Sun className="size-[18px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-[18px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </button>
    );
}
