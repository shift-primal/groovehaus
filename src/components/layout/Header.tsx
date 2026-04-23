import { Link } from '@tanstack/react-router';
import { SignedIn, SignedOut, UserButton } from '@neondatabase/auth/react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b px-4 py-2 backdrop-blur-lg flex items-cener justify-between">
            <Link to="/" className="self-center">
                Groovehaus
            </Link>
            <div className="flex gap-x-4 items-center">
                <Link to="#">X</Link>
                <Link to="#">Y</Link>
                <Link to="#">Z</Link>
                <SignedIn>
                    <UserButton size="icon" />
                </SignedIn>
                <SignedOut>
                    <Link to="/auth/$pathname" params={{ pathname: 'sign-in' }}>
                        Logg inn
                    </Link>
                </SignedOut>
            </div>
        </header>
    );
};
