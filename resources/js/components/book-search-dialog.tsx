import { router } from '@inertiajs/react';
import { BookOpenText, Check, Loader2, Plus, Search } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import books from '@/routes/books';
import readingList from '@/routes/reading-list';
import type { ReadingStatus, SearchResult } from '@/types';
import { getCoverUrl, STATUS_ALL } from '@/types/book';

export function BookSearchDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [addingIndex, setAddingIndex] = useState<number | null>(null);
    const [addedIndices, setAddedIndices] = useState<Set<number>>(new Set());
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

    const doSearch = useCallback((searchQuery: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (searchQuery.trim().length < 2) {
            setResults([]);
            setHasSearched(false);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        debounceRef.current = setTimeout(async () => {
            try {
                const url = books.search.url({ query: { query: searchQuery.trim() } });
                const response = await fetch(url, {
                    headers: { Accept: 'application/json' },
                });
                const data: SearchResult[] = await response.json();
                setResults(data);
            } catch {
                setResults([]);
            } finally {
                setIsSearching(false);
                setHasSearched(true);
            }
        }, 400);
    }, []);

    function handleQueryChange(value: string) {
        setQuery(value);
        doSearch(value);
    }

    function handleAdd(result: SearchResult, index: number, status: ReadingStatus = 'want_to_read') {
        setAddingIndex(index);
        router.post(
            readingList.store.url(),
            {
                title: result.title,
                author: result.author,
                publish_year: result.publish_year,
                cover_id: result.cover_id?.toString() ?? null,
                status,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAddedIndices((prev) => new Set(prev).add(index));
                },
                onFinish: () => {
                    setAddingIndex(null);
                },
            },
        );
    }

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen);
        if (!isOpen) {
            setQuery('');
            setResults([]);
            setHasSearched(false);
            setAddedIndices(new Set());
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Buscar Livros</DialogTitle>
                    <DialogDescription>
                        Pesquise na OpenLibrary e adicione livros à sua lista.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Digite o título ou autor..."
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        className="pl-9"
                        autoFocus
                    />
                </div>

                <div className="-mx-6 flex-1 overflow-y-auto px-6">
                    {isSearching && (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="size-6 animate-spin" />
                            <p className="mt-2 text-sm">Buscando livros...</p>
                        </div>
                    )}

                    {!isSearching && hasSearched && results.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <Search className="size-8 opacity-40" />
                            <p className="mt-2 text-sm">Nenhum livro encontrado.</p>
                            <p className="text-xs">Tente outro termo de busca.</p>
                        </div>
                    )}

                    {!isSearching && results.length > 0 && (
                        <div className="space-y-2 pb-2">
                            {results.map((result, index) => {
                                const coverUrl = getCoverUrl(result.cover_id, 'S');
                                const isAdding = addingIndex === index;
                                const isAdded = addedIndices.has(index);

                                return (
                                    <div
                                        key={`${result.title}-${result.author}-${index}`}
                                        className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                    >
                                        <div className="h-16 w-11 shrink-0 overflow-hidden rounded bg-muted">
                                            {coverUrl ? (
                                                <img
                                                    src={coverUrl}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <BookOpenText className="size-4 text-muted-foreground/40" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{result.title}</p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {result.author}
                                                {result.publish_year && ` · ${result.publish_year}`}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1">
                                            {isAdded ? (
                                                <Button size="sm" variant="ghost" disabled className="gap-1 text-emerald-600">
                                                    <Check className="size-4" />
                                                    Adicionado
                                                </Button>
                                            ) : (
                                                STATUS_ALL.map((s) => (
                                                    <Button
                                                        key={s.value}
                                                        size="sm"
                                                        variant="outline"
                                                        className="hidden text-xs sm:inline-flex"
                                                        disabled={isAdding}
                                                        onClick={() => handleAdd(result, index, s.value)}
                                                    >
                                                        {isAdding ? (
                                                            <Loader2 className="size-3 animate-spin" />
                                                        ) : (
                                                            s.label
                                                        )}
                                                    </Button>
                                                ))
                                            )}
                                            {!isAdded && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-1 sm:hidden"
                                                    disabled={isAdding}
                                                    onClick={() => handleAdd(result, index)}
                                                >
                                                    {isAdding ? (
                                                        <Loader2 className="size-3 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Plus className="size-3" />
                                                            Adicionar
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {!isSearching && !hasSearched && (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <Search className="size-8 opacity-40" />
                            <p className="mt-2 text-sm">Comece a digitar para buscar livros.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
