import { Container } from '#/components/layout/Container';
import { createFileRoute } from '@tanstack/react-router';

// TODO: PLACEHOLDER

const faqs = [
    {
        title: 'Hvor lang er leveringstiden?',
        body: 'Vi sender bestillinger innen 1–2 virkedager. Leveringstid er normalt 2–5 virkedager avhengig av hvor i landet du bor.'
    },
    {
        title: 'Kan jeg returnere en vare?',
        body: 'Ja, du har 14 dagers angrerett. Varen må være i original stand og emballasje. Kontakt oss for å starte en retur.'
    },
    {
        title: 'Hvilke betalingsmetoder godtar dere?',
        body: 'Vi godtar Visa, Mastercard og Vipps. All betaling skjer via sikker og kryptert betalingsløsning.'
    },
    {
        title: 'Selger dere brukte varer?',
        body: 'Ja! Vi har et stort utvalg brukte vinyl-plater og musikkinstrumenter. Tilstanden er alltid tydelig merket på produktsiden.'
    },
    {
        title: 'Kan jeg reservere en vare?',
        body: 'Vi tilbyr ikke reservasjon for øyeblikket. Varer selges etter først til mølla-prinsippet.'
    }
];

const FaqPage = () => {
    return (
        <Container className="max-w-2xl">
            <div className="mb-12">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-4">
                    Hjelp
                </span>
                <h1
                    className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                    style={{ fontFamily: 'Fraunces, serif' }}
                >
                    Vanlige spørsmål
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Finner du ikke svaret du leter etter? Ta kontakt med oss på hei@groovehaus.no.
                </p>
            </div>
            <div className="flex flex-col divide-y divide-border">
                {faqs.map(({ title, body }) => (
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

export const Route = createFileRoute('/faq')({ component: FaqPage });
