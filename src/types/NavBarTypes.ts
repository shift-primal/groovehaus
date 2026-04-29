interface NavBarLogo {
    url: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    text: React.FC<React.SVGProps<SVGSVGElement>>;
    alt: string;
    title: string;
    className?: string;
}

interface NavBarAuth {
    login: {
        title: string;
        url: string;
    };
    signup: {
        title: string;
        url: string;
    };
}

export interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

export interface NavbarProps {
    className?: string;
    logo?: NavBarLogo;
    menu?: MenuItem[];
    auth?: NavBarAuth;
}
