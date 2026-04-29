import { Button } from '#/components/shadcn/button';
import { NavigationMenu, NavigationMenuList } from '#/components/shadcn/navigation-menu';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle
} from '#/components/shadcn/sheet';
import { Accordion } from '#/components/shadcn/accordion';
import { renderMenuItem, renderMobileMenuItem } from '#/lib/renderUtils';
import type { NavbarProps } from '#/types/NavBarTypes';
import { Menu } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@neondatabase/auth/react';
import { Link } from '@tanstack/react-router';

export const NavBar = ({ props }: { props: NavbarProps }) => {
    const { logo, menu, auth } = props;

    if (!logo || !menu || !auth) return;

    const { icon: LogoIcon, text: LogoText } = logo;

    return (
        <div className="sticky top-0 z-50 px-8 py-4 backdrop-blur-lg">
            {/* Desktop Menu */}
            <nav className="hidden items-center justify-between lg:flex">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link to={logo.url} className="flex items-center gap-2">
                        <LogoIcon className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menu.map((item) => renderMenuItem(item))}
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
                    <UserButton />
                </SignedIn>
            </nav>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={logo.url} className="flex items-center gap-2">
                        <LogoIcon className="h-8 w-auto" />
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle className="mt-12">
                                    <Link to={logo.url} className="flex items-center gap-2">
                                        <LogoText className="max-h-6 dark:invert w-auto" />
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 p-4">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="flex w-full flex-col gap-4"
                                >
                                    {menu.map((item) => renderMobileMenuItem(item))}
                                </Accordion>

                                <SignedOut>
                                    <div className="flex flex-col gap-3">
                                        <Button asChild variant="outline" size="sm">
                                            <Link to={auth.login.url}>{auth.login.title}</Link>
                                        </Button>
                                        <Button asChild size="sm">
                                            <Link to={auth.signup.url}>{auth.signup.title}</Link>
                                        </Button>
                                    </div>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};
