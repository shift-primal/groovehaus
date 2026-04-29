interface FooterLink {
    name: string;
    href: string;
}
interface FooterSection {
    title: string;
    links: FooterLink[];
}
interface FooterLogo {
    url: string;
    text: React.FC<React.SVGProps<SVGSVGElement>>;
    alt: string;
    title: string;
    className?: string;
}

export interface FooterProps {
    className?: string;
    logo?: FooterLogo;
    description?: string;
    sections?: FooterSection[];
    copyright?: string;
    legalLinks?: FooterLink[];
}
