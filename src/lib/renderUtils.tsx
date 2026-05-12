import { AccordionContent, AccordionItem, AccordionTrigger } from '#/components/shadcn/accordion';
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger
} from '#/components/shadcn/navigation-menu';
import { cn } from '#/lib/utils';
import type { Menu, MenuItem } from '#/types/layoutTypes';
import { Link } from '@tanstack/react-router';

const SubMenuLink = ({ item, accordion }: { item: MenuItem; accordion: boolean }) => {
    const baseCn =
        'flex w-full flex-row rounded-md leading-none decoration-0 transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground';

    return (
        <Link className={cn(baseCn, accordion ? 'gap-4 p-3' : '')} to={item.url}>
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                )}
            </div>
        </Link>
    );
};

export const renderMobileMenuItem = (menu: Menu) => {
    if (menu.items && menu.accordion) {
        return (
            <AccordionItem value={menu.title} className="space-y-4 shrink">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline border-0">
                    {menu.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2 h-fit">
                    {menu.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} accordion={true} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }
    if (menu.items && !menu.accordion) {
        return (
            <div className="flex flex-col gap-3 flex-1 grow justify-end text-muted-foreground">
                {menu.items.map((subItem) => (
                    <SubMenuLink key={subItem.title} item={subItem} accordion={false} />
                ))}
            </div>
        );
    }

    return (
        <Link to={menu.url ?? '/'} className="text-md font-semibold mb-4">
            {menu.title}
        </Link>
    );
};

export const renderMenuItem = (menu: Menu) => {
    if (menu.items) {
        return (
            <NavigationMenuItem>
                <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground w-full">
                    <div className="flex flex-col p-2 min-w-80">
                        {menu.items.map((subItem) => (
                            <NavigationMenuLink asChild key={subItem.title} className="w-80">
                                <SubMenuLink item={subItem} accordion={true} />
                            </NavigationMenuLink>
                        ))}
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                href={menu.url ?? '/'}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {menu.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};
