import { Container } from '#/components/layout/Container';
import { createFileRoute } from '@tanstack/react-router';

// TODO: PLACEHOLDER

const sections = [
    {
        title: '1. Hvilke data vi samler inn',
        body: 'Vi samler inn navn, e-postadresse, leveringsadresse og betalingsinformasjon når du handler hos oss. Vi bruker også informasjonskapsler for å forbedre brukeropplevelsen.'
    },
    {
        title: '2. Hvordan vi bruker dataene',
        body: 'Dine opplysninger brukes til å behandle bestillinger, sende ordrebekreftelser og gi deg kundeservice. Vi sender deg ikke markedsføring uten ditt samtykke.'
    },
    {
        title: '3. Deling med tredjeparter',
        body: 'Vi deler kun nødvendig informasjon med betalingsleverandør og fraktselskap for å gjennomføre kjøpet. Vi selger aldri dine data.'
    },
    {
        title: '4. Dine rettigheter',
        body: 'Du har rett til innsyn, retting og sletting av dine personopplysninger. Ta kontakt på hei@groovehaus.no for å utøve dine rettigheter.'
    }
];

const PrivacyPage = () => {
    return (
        <Container className="max-w-2xl">
            <div className="mb-12">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-4">
                    Juridisk
                </span>
                <h1
                    className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                    style={{ fontFamily: 'Fraunces, serif' }}
                >
                    Personvern
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Sist oppdatert: Mai 2025. Vi tar personvernet ditt på alvor og behandler alle
                    opplysninger i samsvar med GDPR.
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

export const Route = createFileRoute('/privacy')({ component: PrivacyPage });
