import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpenCheck, BookOpenText, Bookmark, Library, Plus, Search } from 'lucide-react';
import { BookSearchDialog } from '@/components/book-search-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import readingList from '@/routes/reading-list';
import type { BreadcrumbItem, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard() },
];

type Counts = {
    total: number;
    reading: number;
    read: number;
    want_to_read: number;
};

type Props = {
    counts: Counts;
};

export default function Dashboard({ counts }: Props) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const firstName = auth.user.name.split(' ')[0];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Olá, {firstName}!
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Bem-vindo à sua biblioteca pessoal.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Todos os livros"
                        count={counts.total}
                        icon={Library}
                        href={readingList.index.url()}
                        color="text-primary"
                    />
                    <StatCard
                        label="Lendo"
                        count={counts.reading}
                        icon={BookOpenText}
                        href={readingList.index.url({ query: { status: 'reading' } })}
                        color="text-blue-600 dark:text-blue-400"
                    />
                    <StatCard
                        label="Lidos"
                        count={counts.read}
                        icon={BookOpenCheck}
                        href={readingList.index.url({ query: { status: 'read' } })}
                        color="text-emerald-600 dark:text-emerald-400"
                    />
                    <StatCard
                        label="Quero Ler"
                        count={counts.want_to_read}
                        icon={Bookmark}
                        href={readingList.index.url({ query: { status: 'want_to_read' } })}
                        color="text-amber-600 dark:text-amber-400"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="size-5" />
                                Descobrir Livros
                            </CardTitle>
                            <CardDescription>
                                Pesquise na OpenLibrary e adicione livros à sua lista de leitura.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BookSearchDialog>
                                <Button className="gap-2">
                                    <Plus className="size-4" />
                                    Buscar Livros
                                </Button>
                            </BookSearchDialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Library className="size-5" />
                                Sua Biblioteca
                            </CardTitle>
                            <CardDescription>
                                Visualize e gerencie todos os livros da sua lista.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href={readingList.index.url()}>
                                    Ver Minha Lista
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({
    label,
    count,
    icon: Icon,
    href,
    color,
}: {
    label: string;
    count: number;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
}) {
    return (
        <Link href={href}>
            <Card className="transition-all hover:shadow-md hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardDescription>{label}</CardDescription>
                    <Icon className={`size-5 ${color}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold tabular-nums">{count}</div>
                </CardContent>
            </Card>
        </Link>
    );
}
