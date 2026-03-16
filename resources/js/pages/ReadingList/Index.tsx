import { Head, router } from '@inertiajs/react';
import {
    BookOpenCheck,
    BookOpenText,
    Bookmark,
    Library,
    Plus,
    Search,
} from 'lucide-react';
import { BookCard } from '@/components/book-card';
import { BookSearchDialog } from '@/components/book-search-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import readingList from '@/routes/reading-list';
import type { Book, BreadcrumbItem, ReadingStatus } from '@/types';
import { STATUS_LABELS } from '@/types/book';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Minha Lista', href: readingList.index.url() },
];

type StatusTab = {
    value: ReadingStatus | null;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

const STATUS_TABS: StatusTab[] = [
    { value: null, label: 'Todos', icon: Library },
    { value: 'reading', label: STATUS_LABELS.reading, icon: BookOpenText },
    { value: 'read', label: STATUS_LABELS.read, icon: BookOpenCheck },
    { value: 'want_to_read', label: STATUS_LABELS.want_to_read, icon: Bookmark },
];

type Props = {
    books: Book[];
    currentStatus: ReadingStatus | null;
};

export default function ReadingListIndex({ books, currentStatus }: Props) {
    function handleFilterChange(status: ReadingStatus | null) {
        const url = status
            ? readingList.index.url({ query: { status } })
            : readingList.index.url();

        router.get(url, {}, { preserveState: true, preserveScroll: true });
    }

    const counts = {
        all: books.length,
        reading: books.filter((b) => b.pivot.status === 'reading').length,
        read: books.filter((b) => b.pivot.status === 'read').length,
        want_to_read: books.filter((b) => b.pivot.status === 'want_to_read').length,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minha Lista de Leitura" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Minha Lista de Leitura
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {books.length === 0
                                ? 'Comece adicionando livros à sua lista.'
                                : `${books.length} ${books.length === 1 ? 'livro' : 'livros'} na sua lista.`}
                        </p>
                    </div>

                    <BookSearchDialog>
                        <Button className="gap-2">
                            <Plus className="size-4" />
                            Adicionar Livro
                        </Button>
                    </BookSearchDialog>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {STATUS_TABS.map((tab) => {
                        const isActive = currentStatus === tab.value;
                        const count =
                            tab.value === null
                                ? counts.all
                                : counts[tab.value];

                        return (
                            <Button
                                key={tab.value ?? 'all'}
                                variant={isActive ? 'default' : 'outline'}
                                size="sm"
                                className="shrink-0 gap-1.5"
                                onClick={() => handleFilterChange(tab.value)}
                            >
                                <tab.icon className="size-3.5" />
                                {tab.label}
                                {!currentStatus && count > 0 && (
                                    <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                                        isActive
                                            ? 'bg-primary-foreground/20 text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    }`}>
                                        {count}
                                    </span>
                                )}
                            </Button>
                        );
                    })}
                </div>

                {/* Book Grid */}
                {books.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <EmptyState hasFilter={!!currentStatus} />
                )}
            </div>
        </AppLayout>
    );
}

function EmptyState({ hasFilter }: { hasFilter: boolean }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed py-16">
            <div className="rounded-full bg-muted p-4">
                {hasFilter ? (
                    <Search className="size-8 text-muted-foreground" />
                ) : (
                    <Library className="size-8 text-muted-foreground" />
                )}
            </div>
            <h3 className="mt-4 text-lg font-semibold">
                {hasFilter ? 'Nenhum livro neste filtro' : 'Sua lista está vazia'}
            </h3>
            <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
                {hasFilter
                    ? 'Não há livros com esse status. Tente outro filtro ou adicione mais livros.'
                    : 'Comece buscando livros e adicionando-os à sua lista de leitura.'}
            </p>
            {!hasFilter && (
                <BookSearchDialog>
                    <Button className="mt-6 gap-2">
                        <Plus className="size-4" />
                        Buscar Livros
                    </Button>
                </BookSearchDialog>
            )}
        </div>
    );
}
