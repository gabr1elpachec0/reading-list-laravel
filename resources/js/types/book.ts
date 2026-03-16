export type ReadingStatus = 'read' | 'reading' | 'want_to_read';

export type BookPivot = {
    user_id: number;
    book_id: number;
    status: ReadingStatus;
    created_at: string;
    updated_at: string;
};

export type Book = {
    id: number;
    title: string;
    author: string;
    publish_year: number | null;
    cover_id: string | null;
    created_at: string;
    updated_at: string;
    pivot: BookPivot;
};

export type SearchResult = {
    title: string;
    author: string;
    publish_year: number | null;
    cover_id: number | null;
};

export const STATUS_LABELS: Record<ReadingStatus, string> = {
    reading: 'Lendo',
    read: 'Lido',
    want_to_read: 'Quero Ler',
};

export const STATUS_ALL = [
    { value: 'reading', label: 'Lendo' },
    { value: 'read', label: 'Lido' },
    { value: 'want_to_read', label: 'Quero Ler' },
] as const;

export function getCoverUrl(
    coverId: string | number | null,
    size: 'S' | 'M' | 'L' = 'M',
): string | null {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
