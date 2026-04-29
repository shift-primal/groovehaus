import { Disc3, Guitar, KeyboardMusic, Package, Turntable } from 'lucide-react';

import logoIcon from '#/assets/groovehaus-logo-icon.svg?react';
import logoText from '#/assets/groovehaus-logo-text.svg?react';

export const navBarProps = {
    logo: {
        url: '/',
        icon: logoIcon,
        text: logoText,
        alt: 'logo',
        title: 'Groovehaus'
    },
    menu: [
        { title: 'Hjem', url: '/' },
        {
            title: 'Produkter',
            url: '#',
            items: [
                {
                    title: 'Alle',
                    description: 'Bla gjennom hele vårt sortiment',
                    icon: <Package className="size-5 shrink-0" />,
                    url: '/products'
                },
                {
                    title: 'Vinyl-plater',
                    description: 'Nye og brukte plater fra ulike sjangre',
                    icon: <Disc3 className="size-5 shrink-0" />,
                    url: '#'
                },
                {
                    title: 'Gitarer',
                    description: 'Elektriske og akustiske gitarer for alle nivåer',
                    icon: <Guitar className="size-5 shrink-0" />,
                    url: '#'
                },
                {
                    title: 'Platespillere',
                    description: 'Platespillere for vinyl-entusiaster',
                    icon: <Turntable className="size-5 shrink-0" />,
                    url: '#'
                },
                {
                    title: 'MIDI-kontrollere',
                    description: 'Kontrollere for musikk-produksjon og live bruk',
                    icon: <KeyboardMusic className="size-5 shrink-0" />,
                    url: '#'
                }
            ]
        },
        {
            title: 'Kontakt oss',
            url: '#'
        },
        {
            title: 'Om oss',
            url: '#'
        },
        {
            title: 'Terms of Service',
            url: '#'
        }
    ],
    auth: {
        login: { title: 'Login', url: '/auth/$pathname', params: { pathname: 'sign-in' } },
        signup: { title: 'Sign up', url: '/auth/$pathname', params: { pathname: 'sign-up' } }
    }
};
