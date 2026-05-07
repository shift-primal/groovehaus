import { AccordionContent, AccordionItem, AccordionTrigger } from '#/components/shadcn/accordion';
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger
} from '#/components/shadcn/navigation-menu';
import { cn } from '#/lib/utils';
import type { MenuItem } from '#/types/layoutTypes';
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

export const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items && item.accordion) {
        return (
            <AccordionItem key={item.title} value={item.title} className="space-y-4 shrink">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline border-0">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2 h-fit">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} accordion={true} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }
    if (item.items && !item.accordion) {
        return (
            <div className="flex flex-col gap-3 flex-1 grow justify-end text-muted-foreground">
                {item.items.map((subItem) => (
                    <SubMenuLink key={subItem.title} item={subItem} accordion={false} />
                ))}
            </div>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold mb-4">
            {item.title}
        </a>
    );
};

export const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} accordion={true} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};
