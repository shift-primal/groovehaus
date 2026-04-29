import { cn } from '#/lib/utils';

export const Container = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn('mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8', className)}>
        {children}
    </div>
);
