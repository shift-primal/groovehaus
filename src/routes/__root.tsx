import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import TanStackQueryProvider from '../integrations/tanstack-query/root-provider';
import type { QueryClient } from '@tanstack/react-query';

import { NeonAuthUIProvider } from '@neondatabase/auth/react';

import appCss from '#/styles/globals.css?url';

import { Footer } from '#/components/layout/Footer';
import { footerProps } from '#/config/footer';

import { NavBar } from '#/components/layout/NavBar';
import { navBarProps } from '#/config/navbar';

import { authClient } from '#/lib/auth';
import { Container } from '#/components/layout/Container';
import { Toaster } from '#/components/shadcn/sonner';

interface MyRouterContext {
    queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
    notFoundComponent: () => <div>404 - Ikke funnet</div>,
    head: () => ({
        meta: [
            {
                charSet: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                title: 'TanStack Start Starter'
            }
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss
            }
        ]
    }),
    shellComponent: RootDocument
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className="h-full">
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
                <HeadContent />
            </head>
            <body className="font-sans antialiased wrap-anywhere overflow-x-hidden">
                <TanStackQueryProvider>
                    <NeonAuthUIProvider authClient={authClient}>
                        <div className="flex flex-col min-h-screen w-full">
                            <NavBar {...navBarProps} />
                            <main className="flex-1">
                                <Container>{children}</Container>
                            </main>
                            <Footer {...footerProps} />
                            <Toaster />
                        </div>
                    </NeonAuthUIProvider>
                </TanStackQueryProvider>
                <Scripts />
            </body>
        </html>
    );
}
