import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    BookOpenCheck,
    BookOpenText,
    Bookmark,
    Library,
    Lock,
    Moon,
    Search,
    Sparkles,
    Sun,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () =>
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');

    return (
        <>
            <Head title="Sua Biblioteca Pessoal">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="sticky top-0 z-50 border-b border-[#e3e3e0] bg-[#FDFDFC]/80 backdrop-blur-lg dark:border-[#2E2E2A] dark:bg-[#0a0a0a]/80">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-[#1b1b18] dark:bg-[#EDEDEC]">
                                <BookOpen className="size-5 text-white dark:text-[#0a0a0a]" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">
                                MyReading
                            </span>
                        </div>
                        <nav className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="inline-flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-[#f5f5f4] dark:hover:bg-[#1a1a17]"
                                aria-label={
                                    resolvedAppearance === 'dark'
                                        ? 'Ativar tema claro'
                                        : 'Ativar tema escuro'
                                }
                            >
                                <Sun className="size-[18px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute size-[18px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            </button>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center rounded-lg bg-[#1b1b18] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-[#1b1b18] transition-colors hover:bg-[#f5f5f4] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a17]"
                                    >
                                        Entrar
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center rounded-lg bg-[#1b1b18] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-white"
                                        >
                                            Criar Conta
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="flex-1">
                    <section className="relative overflow-hidden px-6 py-24 lg:py-36">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-amber-100/40 via-transparent to-emerald-100/30 blur-3xl dark:from-amber-900/10 dark:to-emerald-900/10" />
                        </div>
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e3e3e0] bg-white px-4 py-1.5 text-sm text-[#706f6c] shadow-sm dark:border-[#2E2E2A] dark:bg-[#161615] dark:text-[#A1A09A]">
                                <Sparkles className="size-4 text-amber-500" />
                                Organize sua vida literária
                            </div>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Sua biblioteca pessoal,{' '}
                                <span className="bg-linear-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-emerald-400">
                                    sempre à mão
                                </span>
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#706f6c] dark:text-[#A1A09A]">
                                Descubra novos livros, organize suas leituras e
                                acompanhe seu progresso. Tudo em um só lugar,
                                simples e bonito.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#1b1b18] px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-black hover:shadow-xl dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-white"
                                    >
                                        <Library className="size-4" />
                                        Ir para o Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#1b1b18] px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-black hover:shadow-xl dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-white"
                                            >
                                                Começar Gratuitamente
                                            </Link>
                                        )}
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center gap-2 rounded-lg border border-[#e3e3e0] px-8 py-3 text-sm font-medium text-[#1b1b18] transition-all hover:border-[#c8c8c4] hover:bg-[#f5f5f4] dark:border-[#2E2E2A] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] dark:hover:bg-[#1a1a17]"
                                        >
                                            Já tenho conta
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-[#e3e3e0] bg-[#fafaf9] px-6 py-20 lg:py-28 dark:border-[#2E2E2A] dark:bg-[#0f0f0e]">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-14 text-center">
                                <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
                                    Tudo que você precisa para gerenciar suas
                                    leituras
                                </h2>
                                <p className="mx-auto max-w-xl text-[#706f6c] dark:text-[#A1A09A]">
                                    Funcionalidades pensadas para quem ama ler e
                                    quer manter sua coleção organizada.
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <FeatureCard
                                    icon={Search}
                                    title="Busca Inteligente"
                                    description="Pesquise livros diretamente pela OpenLibrary. Milhões de títulos disponíveis para adicionar à sua lista."
                                    color="text-blue-600 dark:text-blue-400"
                                    bg="bg-blue-50 dark:bg-blue-950/30"
                                />
                                <FeatureCard
                                    icon={BookOpenText}
                                    title="Controle de Leitura"
                                    description="Marque livros como 'Lendo', 'Lido' ou 'Quero Ler'. Acompanhe visualmente o status de cada obra."
                                    color="text-emerald-600 dark:text-emerald-400"
                                    bg="bg-emerald-50 dark:bg-emerald-950/30"
                                />
                                <FeatureCard
                                    icon={Library}
                                    title="Biblioteca Pessoal"
                                    description="Todos os seus livros organizados em um só lugar. Filtre por status e encontre rapidamente o que procura."
                                    color="text-violet-600 dark:text-violet-400"
                                    bg="bg-violet-50 dark:bg-violet-950/30"
                                />
                                <FeatureCard
                                    icon={Bookmark}
                                    title="Lista de Desejos"
                                    description="Encontrou um livro interessante? Salve para ler depois e nunca perca uma recomendação."
                                    color="text-amber-600 dark:text-amber-400"
                                    bg="bg-amber-50 dark:bg-amber-950/30"
                                />
                                <FeatureCard
                                    icon={BookOpenCheck}
                                    title="Dashboard Completo"
                                    description="Veja suas estatísticas de leitura em um painel intuitivo. Quantos livros leu, está lendo e quer ler."
                                    color="text-rose-600 dark:text-rose-400"
                                    bg="bg-rose-50 dark:bg-rose-950/30"
                                />
                                <FeatureCard
                                    icon={Lock}
                                    title="Seguro e Privado"
                                    description="Sua conta protegida com verificação de e-mail e autenticação em dois fatores (2FA)."
                                    color="text-slate-600 dark:text-slate-400"
                                    bg="bg-slate-50 dark:bg-slate-950/30"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-[#e3e3e0] px-6 py-20 lg:py-28 dark:border-[#2E2E2A]">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-12 text-center">
                                <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
                                    Como funciona
                                </h2>
                                <p className="mx-auto max-w-xl text-[#706f6c] dark:text-[#A1A09A]">
                                    Em três passos simples, você organiza toda
                                    a sua vida literária.
                                </p>
                            </div>
                            <div className="grid gap-10 sm:grid-cols-3">
                                <StepCard
                                    step="1"
                                    title="Crie sua conta"
                                    description="Cadastre-se gratuitamente em poucos segundos e acesse sua biblioteca pessoal."
                                />
                                <StepCard
                                    step="2"
                                    title="Descubra livros"
                                    description="Use a busca integrada com a OpenLibrary para encontrar qualquer livro do mundo."
                                />
                                <StepCard
                                    step="3"
                                    title="Organize e acompanhe"
                                    description="Adicione livros à sua lista, defina o status de leitura e acompanhe seu progresso."
                                />
                            </div>
                        </div>
                    </section>

                    {!auth.user && (
                        <section className="border-t border-[#e3e3e0] bg-[#fafaf9] px-6 py-20 lg:py-28 dark:border-[#2E2E2A] dark:bg-[#0f0f0e]">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                                    Pronto para organizar suas leituras?
                                </h2>
                                <p className="mb-8 text-[#706f6c] dark:text-[#A1A09A]">
                                    Junte-se ao MyReading e comece a gerenciar
                                    sua biblioteca pessoal hoje mesmo.
                                </p>
                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-2 rounded-lg bg-[#1b1b18] px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-black hover:shadow-xl dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-white"
                                        >
                                            Criar Conta Gratuita
                                        </Link>
                                    )}
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-lg border border-[#e3e3e0] px-8 py-3 text-sm font-medium text-[#1b1b18] transition-all hover:border-[#c8c8c4] hover:bg-[#f5f5f4] dark:border-[#2E2E2A] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] dark:hover:bg-[#1a1a17]"
                                    >
                                        Entrar na minha conta
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <footer className="border-t border-[#e3e3e0] px-6 py-8 dark:border-[#2E2E2A]">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            <BookOpen className="size-4" />
                            <span>MyReading</span>
                        </div>
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            Feito com Laravel, React e Inertia.js
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    description,
    color,
    bg,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    color: string;
    bg: string;
}) {
    return (
        <div className="group rounded-xl border border-[#e3e3e0] bg-white p-6 transition-all hover:border-[#c8c8c4] hover:shadow-md dark:border-[#2E2E2A] dark:bg-[#161615] dark:hover:border-[#3E3E3A]">
            <div
                className={`mb-4 inline-flex size-10 items-center justify-center rounded-lg ${bg}`}
            >
                <Icon className={`size-5 ${color}`} />
            </div>
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-[#706f6c] dark:text-[#A1A09A]">
                {description}
            </p>
        </div>
    );
}

function StepCard({
    step,
    title,
    description,
}: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <div className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#1b1b18] text-lg font-bold text-white dark:bg-[#EDEDEC] dark:text-[#1b1b18]">
                {step}
            </div>
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-[#706f6c] dark:text-[#A1A09A]">
                {description}
            </p>
        </div>
    );
}
