import { router } from '@inertiajs/react';
import { BookOpenCheck, BookOpenText, Bookmark, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import readingList from '@/routes/reading-list';
import type { Book, ReadingStatus } from '@/types';
import { getCoverUrl, STATUS_LABELS } from '@/types/book';

const STATUS_CONFIG: Record<
    ReadingStatus,
    { color: string; icon: React.ComponentType<{ className?: string }> }
> = {
    reading: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300', icon: BookOpenText },
    read: { color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', icon: BookOpenCheck },
    want_to_read: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300', icon: Bookmark },
};

export function BookCard({ book }: { book: Book }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const status = book.pivot.status;
    const config = STATUS_CONFIG[status];
    const coverUrl = getCoverUrl(book.cover_id, 'M');
    const StatusIcon = config.icon;

    function handleStatusChange(newStatus: ReadingStatus) {
        if (newStatus === status) return;
        setIsUpdating(true);
        router.patch(
            readingList.update.url(book.id),
            { status: newStatus },
            {
                preserveScroll: true,
                onFinish: () => setIsUpdating(false),
            },
        );
    }

    function handleRemove() {
        router.delete(readingList.destroy.url(book.id), {
            preserveScroll: true,
        });
    }

    return (
        <div className={`group relative flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md ${isUpdating ? 'opacity-60' : ''}`}>
            <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={`Capa de ${book.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <BookOpenText className="size-8 text-muted-foreground/40" />
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                    <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
                        {book.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {book.author}
                        {book.publish_year && ` · ${book.publish_year}`}
                    </p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <Badge
                        variant="secondary"
                        className={`gap-1 border-0 text-[11px] ${config.color}`}
                    >
                        <StatusIcon className="size-3" />
                        {STATUS_LABELS[status]}
                    </Badge>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 size-7 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(Object.keys(STATUS_LABELS) as ReadingStatus[]).map((s) => {
                        const Icon = STATUS_CONFIG[s].icon;
                        return (
                            <DropdownMenuItem
                                key={s}
                                disabled={s === status}
                                onClick={() => handleStatusChange(s)}
                            >
                                <Icon className="mr-2 size-4" />
                                {STATUS_LABELS[s]}
                            </DropdownMenuItem>
                        );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={handleRemove}
                    >
                        <Trash2 className="mr-2 size-4" />
                        Remover
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
