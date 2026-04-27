import ThemeToggle from '#/components/layout/ThemeToggle';

export const Footer = () => {
    return (
        <footer className="mt-auto border-t px-4 sm:px-6 py-4 flex items-center justify-between text-lg text-muted-foreground">
            <span className="font-medium text-foreground">FOOTER</span>
            <ThemeToggle />
        </footer>
    );
};
