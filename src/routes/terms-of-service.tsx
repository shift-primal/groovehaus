import { Container } from '#/components/layout/Container';
import { createFileRoute } from '@tanstack/react-router';

// TODO: PLACEHOLDER

const sections = [
    {
        title: '1. Bruk av tjenesten',
        body: 'Ved å bruke Groovehaus aksepterer du disse vilkårene. Tjenesten er forbeholdt personer over 18 år. Vi forbeholder oss retten til å endre vilkårene uten forvarsel.'
    },
    {
        title: '2. Bestilling og betaling',
        body: 'Alle priser er oppgitt i norske kroner inkl. MVA. Betaling skjer via sikker betalingsløsning. Bestillingen er bindende når du har mottatt ordrebekreftelse på e-post.'
    },
    {
        title: '3. Retur og reklamasjon',
        body: 'Du har 14 dagers angrerett fra du mottar varen. Varen skal returneres i original stand. Reklamasjon på defekte varer behandles i henhold til norsk forbrukerlovgivning.'
    },
    {
        title: '4. Personvern',
        body: 'Vi behandler dine personopplysninger i samsvar med GDPR. Dine data deles ikke med tredjeparter uten ditt samtykke. Se vår personvernserklæring for mer informasjon.'
    }
];

const TermsPage = () => {
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
                    Vilkår for bruk
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Sist oppdatert: Mai 2025. Ved å handle hos Groovehaus godtar du følgende vilkår
                    og betingelser. Ta kontakt med oss hvis du har spørsmål.
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

export const Route = createFileRoute('/terms-of-service')({
    component: TermsPage
});
