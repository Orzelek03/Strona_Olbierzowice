import { Link } from "@inertiajs/react";
import {
    BookOpen,
    ExternalLink,
    Image,
    LayoutDashboard,
    Megaphone,
    Newspaper,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";

const mainNavItems: NavItem[] = [
    {
        title: "Kokpit",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Aktualności",
        href: "/admin/aktualnosci",
        icon: Newspaper,
    },
    {
        title: "Ogłoszenia",
        href: "/admin/ogloszenia",
        icon: Megaphone,
    },
    {
        title: "Intencje",
        href: "/admin/intencje",
        icon: BookOpen,
    },
    {
        title: "Galeria",
        href: "/admin/albumy",
        icon: Image,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: "Strona parafii",
        href: "/",
        icon: ExternalLink,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
