import { Head, router } from '@inertiajs/react';
import {
    BookOpenCheck,
    BookOpenText,
    Bookmark,
    ChevronLeft,
    ChevronRight,
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

type PaginatedBooks = {
    data: Book[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

type Counts = {
    all: number;
    reading: number;
    read: number;
    want_to_read: number;
};

type Props = {
    books: PaginatedBooks;
    currentStatus: ReadingStatus | null;
    counts: Counts;
};

export default function ReadingListIndex({ books, currentStatus, counts }: Props) {
    function handleFilterChange(status: ReadingStatus | null) {
        const url = status
            ? readingList.index.url({ query: { status } })
            : readingList.index.url();

        router.get(url, {}, { preserveState: true, preserveScroll: true });
    }

    function handlePageChange(page: number) {
        const params: Record<string, string | number> = { page };
        if (currentStatus) params.status = currentStatus;

        router.get(readingList.index.url({ query: params }), {}, {
            preserveState: true,
            preserveScroll: false,
        });
    }

    const tabCount = (tab: StatusTab) =>
        tab.value === null ? counts.all : counts[tab.value];

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
                            {counts.all === 0
                                ? 'Comece adicionando livros à sua lista.'
                                : `${counts.all} ${counts.all === 1 ? 'livro' : 'livros'} na sua lista.`}
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
                        const count = tabCount(tab);

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
                                {count > 0 && (
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

                {/* Book List */}
                {books.data.length > 0 ? (
                    <>
                        <div className="flex flex-col gap-3">
                            {books.data.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={books.current_page}
                            lastPage={books.last_page}
                            from={books.from}
                            to={books.to}
                            total={books.total}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <EmptyState hasFilter={!!currentStatus} />
                )}
            </div>
        </AppLayout>
    );
}

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    from: number | null;
    to: number | null;
    total: number;
    onPageChange: (page: number) => void;
};

function Pagination({ currentPage, lastPage, from, to, total, onPageChange }: PaginationProps) {
    if (lastPage <= 1) return null;

    const pages = buildPageRange(currentPage, lastPage);

    return (
        <div className="flex items-center justify-between gap-4 border-t pt-4">
            <p className="text-sm text-muted-foreground">
                {from && to ? `${from}–${to} de ${total}` : `${total} ${total === 1 ? 'livro' : 'livros'}`}
            </p>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="size-4" />
                </Button>

                {pages.map((page, i) =>
                    page === '...' ? (
                        <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground">
                            …
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={page === currentPage ? 'default' : 'outline'}
                            size="icon"
                            className="size-8 text-sm"
                            onClick={() => onPageChange(page as number)}
                        >
                            {page}
                        </Button>
                    ),
                )}

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}

function buildPageRange(current: number, last: number): (number | '...')[] {
    if (last <= 7) {
        return Array.from({ length: last }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    if (current > 3) pages.push('...');

    for (let p = Math.max(2, current - 1); p <= Math.min(last - 1, current + 1); p++) {
        pages.push(p);
    }

    if (current < last - 2) pages.push('...');

    pages.push(last);

    return pages;
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
