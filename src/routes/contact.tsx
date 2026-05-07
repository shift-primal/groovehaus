import { Container } from '#/components/layout/Container';
import { createFileRoute } from '@tanstack/react-router';
import { Mail, MapPin, Phone } from 'lucide-react';

// TODO: PLACEHOLDER

const contact = [
    { icon: Mail, label: 'E-post', value: 'hei@groovehaus.no' },
    { icon: Phone, label: 'Telefon', value: '+47 123 45 678' },
    { icon: MapPin, label: 'Adresse', value: 'Grünerløkka, Oslo' }
];

const KontaktPage = () => {
    return (
        <Container className="max-w-2xl">
            <div className="mb-12">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-4">
                    Si hei
                </span>
                <h1
                    className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                    style={{ fontFamily: 'Fraunces, serif' }}
                >
                    Kontakt oss
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Har du spørsmål om en bestilling, et produkt, eller bare vil slå av en prat om
                    musikk? Vi hører gjerne fra deg.
                </p>
            </div>

            <div className="flex flex-col divide-y divide-border">
                {contact.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 py-6">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                            <Icon className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                            <p className="text-sm font-medium">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export const Route = createFileRoute('/contact')({
    component: KontaktPage
});
