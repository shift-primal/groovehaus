import { Link } from '@tanstack/react-router';
import ThemeToggle from '#/components/ui/ThemeToggle';
import { SignedIn, SignedOut, UserButton } from '@neondatabase/auth/react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b px-4 backdrop-blur-lg flex items-cener justify-between">
            <Link to="/">Groovehaus</Link>
            <div className="flex gap-x-4 items-center">
                <SignedIn>
                    <UserButton size="icon" />
                </SignedIn>
                <SignedOut>
                    <Link to="/auth/$pathname" params={{ pathname: 'sign-in' }}>
                        Logg inn
                    </Link>
                </SignedOut>
            </div>
            <ThemeToggle />
        </header>
    );
};
