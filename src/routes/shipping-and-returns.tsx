import { Container } from '#/components/layout/Container';
import { createFileRoute } from '@tanstack/react-router';

// TODO: PLACEHOLDER

const sections = [
    {
        title: 'Leveringstid',
        body: 'Vi sender alle bestillinger innen 1–2 virkedager. Normal leveringstid med Posten er 2–5 virkedager. Ekspress-levering neste virkedag er tilgjengelig mot tillegg.'
    },
    {
        title: 'Fraktkostnader',
        body: 'Standard frakt koster 79 kr. Fri frakt på alle bestillinger over 999 kr. Ekspresslevering koster 149 kr.'
    },
    {
        title: 'Retur',
        body: 'Du har 14 dagers angrerett fra du mottar varen. Varen må returneres i original stand og emballasje. Returfrakt bekostes av kunden med mindre varen er defekt.'
    },
    {
        title: 'Reklamasjon',
        body: 'Mottatt du en defekt eller feil vare? Kontakt oss på hei@groovehaus.no innen 48 timer med bilde av varen, så ordner vi opp.'
    }
];

const ShippingPage = () => {
    return (
        <Container className="max-w-2xl">
            <div className="mb-12">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-4">
                    Kundeservice
                </span>
                <h1
                    className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                    style={{ fontFamily: 'Fraunces, serif' }}
                >
                    Frakt og retur
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Vi sender over hele Norge og ønsker at du skal være fornøyd. Her finner du alt
                    du trenger å vite om frakt, levering og retur.
                </p>
            </div>
            <div className="flex flex-col divide-y divide-border">
                {sections.map(({ title, body }) => (
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

export const Route = createFileRoute('/shipping-and-returns')({ component: ShippingPage });
