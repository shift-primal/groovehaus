import { Container } from '#/components/layout/Container';
import { Button } from '#/components/shadcn/button';
import { CATEGORIES } from '#/config/products';
import { ProductsGrid } from '#/features/products/components/ProductsGrid';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Disc3, Guitar, KeyboardMusic, Turntable } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categoryMeta: Record<string, { icon: LucideIcon; color: string }> = {
    'vinyl-records': { icon: Disc3, color: 'from-amber-950/40 to-transparent' },
    'guitars': { icon: Guitar, color: 'from-emerald-950/40 to-transparent' },
    'turntables': { icon: Turntable, color: 'from-sky-950/40 to-transparent' },
    'midi-controllers': { icon: KeyboardMusic, color: 'from-violet-950/40 to-transparent' }
};

const HomePage = () => {
    return (
        <div>
            {/* Hero */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,oklch(0.3_0.05_285)_0%,transparent_70%)]" />
                <Container className="relative z-10 py-20 md:py-32">
                    <div className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
                            Vinyl · Gitarer · Utstyr
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
                            style={{ fontFamily: 'Fraunces, serif' }}
                        >
                            Musikken
                            <br />
                            <span className="italic text-muted-foreground">lever</span> i
                            <br />
                            grooven.
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
                            Nye og brukte vinyl-plater, gitarer og musikk-utstyr — kuratert for deg
                            som tar lyden på alvor.
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8">
                            <Link to="/products">Utforsk sortimentet</Link>
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Categories */}
            <section className="border-b border-border">
                <Container>
                    <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6">
                        Kategorier
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {CATEGORIES.map(({ name, slug }) => {
                            const { icon: Icon, color } = categoryMeta[slug];
                            return (
                                <Link
                                    key={slug}
                                    to="/products"
                                    search={{ category: slug }}
                                    className="group relative flex flex-col items-start justify-between rounded-xl border border-border bg-card p-5 min-h-32 overflow-hidden transition-colors hover:border-foreground/30"
                                >
                                    <div
                                        className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity`}
                                    />
                                    <Icon className="size-6 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
                                    <span className="text-sm font-semibold relative z-10">
                                        {name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* New arrivals */}
            <section>
                <Container>
                    <div className="flex items-baseline justify-between mb-6">
                        <h2
                            className="text-2xl md:text-3xl font-bold"
                            style={{ fontFamily: 'Fraunces, serif' }}
                        >
                            Nye ankomster
                        </h2>
                        <Link
                            to="/products"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Se alle →
                        </Link>
                    </div>
                    <ProductsGrid products={[]} />
                </Container>
            </section>
        </div>
    );
};

export const Route = createFileRoute('/')({ component: HomePage });
