import type { FooterProps } from '#/types/FooterTypes';
import { Link } from '@tanstack/react-router';

export const Footer = ({ props }: { props: FooterProps }) => {
    const { logo, description, sections, copyright, legalLinks } = props;

    if (!logo) return;

    const MAX_SECTIONS = 4;
    const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

    const { text: LogoText } = logo;

    return (
        <div className="px-4 py-8">
            <footer>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
                    <div className="col-span-2 mb-8 lg:mb-0">
                        <div className="flex items-center lg:justify-start">
                            <Link to={logo.url} className="flex items-center">
                                <LogoText className="max-h-6 dark:invert w-auto" />
                            </Link>
                        </div>
                        <p className="mt-4 text-sm font-medium text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {visibleSections.map((section, sectionIdx) => (
                        <div key={sectionIdx}>
                            <h3 className="mb-4 text-sm font-semibold tracking-tight">
                                {section.title}
                            </h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx} className="font-medium hover:text-primary">
                                        <Link to={link.href}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
                    <p>{copyright}</p>
                    <ul className="flex gap-4">
                        {legalLinks?.map((link, linkIdx) => (
                            <li key={linkIdx} className="underline hover:text-primary">
                                <Link to={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>
        </div>
    );
};
