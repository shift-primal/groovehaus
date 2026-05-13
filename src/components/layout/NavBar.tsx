import { Button } from '#/components/shadcn/button';
import { NavigationMenu, NavigationMenuList } from '#/components/shadcn/navigation-menu';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from '#/components/shadcn/sheet';
import { Accordion } from '#/components/shadcn/accordion';
import { renderMenuItem, renderMobileMenuItem } from '#/lib/renderUtils';
import type { NavbarProps } from '#/types/layoutTypes';
import { Menu } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@neondatabase/auth/react';
import { Link } from '@tanstack/react-router';
import { Fragment, useState } from 'react';
import { cn, countTotalCartItems } from '#/lib/utils';
import { ShoppingCartIcon } from '#/components/layout/ShoppingCartIcon';
import { authClient } from '#/lib/auth';
import { useCart } from '#/features/cart/hooks/useCart';

export const NavBar = ({ logo, menu, auth, cart, className }: NavbarProps) => {
    if (!logo || !logo.icon || !logo.text || !menu || !auth || !cart) return;

    const { data: userData } = authClient.useSession();
    const { cart: cartData } = useCart(userData?.user.id ?? '');

    const cartCount = countTotalCartItems(cartData.data ?? []);

    const { text: LogoText, icon: LogoIcon } = logo;

    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <div
            className={cn(
                'sticky top-0 z-50 px-8 py-4 backdrop-blur-lg border-b bg-background-lighter',
                className
            )}
        >
            {/* Desktop Menu */}
            <nav className="hidden items-center justify-between lg:flex">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link to={logo.url} className="flex items-center gap-2">
                        <LogoIcon className="max-h-8 w-auto" />
                    </Link>
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menu.map((item) => (
                                    <Fragment key={item.title}>{renderMenuItem(item)}</Fragment>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                <SignedOut>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link to={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link to={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton size="icon" />
                </SignedIn>
            </nav>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={logo.url} className="flex items-center gap-2">
                        <LogoIcon className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-x-4">
                        <ShoppingCartIcon url={cart.url} quantity={cartCount} />
                        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                className="overflow-y-auto"
                                onClick={(e) => {
                                    if ((e.target as HTMLElement).closest('a')) setSheetOpen(false);
                                }}
                            >
                                <SheetHeader>
                                    <SheetTitle className="mt-12">
                                        <Link to={logo.url}>
                                            <LogoText className="max-h-6 dark:invert w-64" />
                                        </Link>
                                    </SheetTitle>
                                    <SheetDescription asChild>
                                        <h1 className="sr-only">Navigation menu</h1>
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="p-4 h-full">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex gap-y-8 h-full flex-col"
                                        defaultValue="Produkter"
                                    >
                                        {menu.map((item) => (
                                            <Fragment key={item.title}>
                                                {renderMobileMenuItem(item)}
                                            </Fragment>
                                        ))}
                                    </Accordion>
                                </div>

                                <div className="p-4 h-fit">
                                    <SignedOut>
                                        <div className="flex flex-col gap-3">
                                            <Button asChild variant="outline" size="sm">
                                                <Link to={auth.login.url}>{auth.login.title}</Link>
                                            </Button>
                                            <Button asChild size="sm">
                                                <Link to={auth.signup.url}>
                                                    {auth.signup.title}
                                                </Link>
                                            </Button>
                                        </div>
                                    </SignedOut>
                                    <SignedIn>
                                        <UserButton size="icon" />
                                    </SignedIn>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
};
