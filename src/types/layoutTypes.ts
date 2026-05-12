export interface Link {
    title: string;
    url: string;
}

interface BaseLogo {
    url: string;
    alt: string;
    title: string;
    className?: string;
}

// NavBar
//
export interface Logo extends BaseLogo {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    text?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NavBarAuth {
    login: Link;
    signup: Link;
}

export interface MenuItem extends Link {
    description?: string;
    icon?: React.ReactNode;
}

export interface Menu {
    title: string;
    accordion?: boolean;
    url?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

export interface NavbarProps {
    className?: string;
    logo?: Logo;
    menu?: Menu[];
    auth?: NavBarAuth;
}

// Footer

interface FooterSection {
    title: string;
    links: Link[];
}

export interface FooterProps {
    className?: string;
    logo?: Logo;
    description?: string;
    sections?: FooterSection[];
    copyright?: string;
    legalLinks?: Link[];
    maxSections?: number;
}
