import { Button } from '#/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import { MoveLeft } from 'lucide-react';

export const BackButton = () => {
    return (
        <Button variant="ghost" asChild className="absolute top-25 left-5 bg-accent/50">
            <Link to="/products">
                <MoveLeft />
            </Link>
        </Button>
    );
};
