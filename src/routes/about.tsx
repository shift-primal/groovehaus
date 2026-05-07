import { Container } from '#/components/layout/Container';
import { createFileRoute } from '@tanstack/react-router';

// TODO: PLACEHOLDER

const values = [
    {
        title: 'Kuratert med omhu',
        body: 'Vi plukker ut vinyl, gitarer og utstyr vi selv ville hatt i samlingen. Ingen fyllmasse — bare det som holder mål.'
    },
    {
        title: 'For de som bryr seg om lyd',
        body: 'Groovehaus er bygget for musikkelskere. Enten du jakter en sjelden plate eller ditt første instrument, er du på rett sted.'
    },
    {
        title: 'Lokalt hjerte',
        body: 'Vi holder til i Oslo, men sender over hele landet. Musikk har ingen grenser — det har ikke vi heller.'
    }
];

const AboutPage = () => {
    return (
        <Container className="max-w-2xl">
            <div className="mb-12">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-4">
                    Vår historie
                </span>
                <h1
                    className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                    style={{ fontFamily: 'Fraunces, serif' }}
                >
                    Om Groovehaus
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Groovehaus ble startet av musikkelskere, for musikkelskere. Vi tror på at god
                    lyd fortjener godt utstyr — og at musikk er mer enn bakgrunnsstøy.
                </p>
            </div>

            <div className="flex flex-col divide-y divide-border">
                {values.map(({ title, body }) => (
                    <div key={title} className="py-8">
                        <h2
                            className="text-lg font-semibold mb-3"
                            style={{ fontFamily: 'Fraunces, serif' }}
                        >
                            {title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export const Route = createFileRoute('/about')({
    component: AboutPage
});
