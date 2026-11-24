import { Link, usePage } from "@inertiajs/react";
import {
    BookOpen,
    Clock,
    ExternalLink,
    Eye,
    Home,
    Images,
    Landmark,
    Mail,
    MapPin,
    Megaphone,
    Menu,
    Phone,
    X,
} from "lucide-react";
import type { ReactNode } from "react";
import React, { useState } from "react";
import AppLogoIcon from "@/components/app-logo-icon";

type ParishLayoutProps = {
    children: ReactNode;
    showpic?: boolean;
    hero?: ReactNode;
};

const NAV_ITEMS = [
    { label: "Główna", href: "/", icon: Home, exact: true },
    { label: "Intencje", href: "/intencje", icon: BookOpen, exact: false },
    {
        label: "Ogłoszenia",
        href: "/ogloszenia",
        icon: Megaphone,
        exact: false,
        extraPrefixes: ["/katechezy"],
    },
    { label: "Historia", href: "/historia", icon: Landmark, exact: false },
    { label: "Galeria", href: "/galeria", icon: Images, exact: false },
    { label: "Kontakt", href: "/kontakt", icon: Mail, exact: false },
];

const EXTERNAL_LINKS = [
    { label: "Cmentarz parafialny", href: "https://mogily.pl/olbierzowice" },
    { label: "Czytania na dziś", href: "https://niezbednik.niedziela.pl/" },
    { label: "Diecezja Sandomierska", href: "https://diecezjasandomierska.pl/" },
];

export default function ParishLayout({
    children,
    showpic,
    hero,
}: ParishLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const page = usePage();
    const { auth, visitCount } = page.props as {
        auth?: { user?: unknown };
        visitCount?: number;
    };
    const formattedVisits =
        typeof visitCount === "number"
            ? visitCount.toLocaleString("pl-PL")
            : null;
    const currentPath = page.url.split("?")[0];

    const isItemActive = (item: (typeof NAV_ITEMS)[number]) => {
        if (item.exact) {
            return currentPath === item.href;
        }
        if (
            currentPath === item.href ||
            currentPath.startsWith(`${item.href}/`)
        ) {
            return true;
        }
        if (item.extraPrefixes) {
            return item.extraPrefixes.some(
                (prefix) =>
                    currentPath === prefix ||
                    currentPath.startsWith(`${prefix}/`),
            );
        }
        return false;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-parish-cream text-[#231f1b] selection:bg-parish-gold/30 selection:text-parish-navy">
            {/* GÓRNY PASEK TOŻSAMOŚCI PARAFII (DESKTOP) */}
            <header className="hidden lg:block bg-gradient-to-r from-parish-navy-dark via-parish-navy to-[#1b365d] text-[#f8f5ef] border-b border-parish-gold/40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-4 group focus:outline-none"
                    >
                        <div className="w-12 h-12 rounded-xl bg-parish-navy-dark/80 border border-parish-gold/60 flex items-center justify-center shadow-md group-hover:border-parish-gold-light transition-colors">
                            <AppLogoIcon className="w-8 h-8 text-parish-gold-light" />
                        </div>
                        <div>
                            <div className="font-serif text-2xl font-semibold tracking-wide text-white leading-tight group-hover:text-parish-gold-light transition-colors">
                                Parafia pw. św. Wawrzyńca
                            </div>
                            <div className="flex items-center gap-3 mt-0.5">
                                <span className="h-px w-6 bg-parish-gold/70" />
                                <span className="text-xs uppercase tracking-[0.25em] text-parish-gold-light font-medium">
                                    w Olbierzowicach
                                </span>
                                <span className="h-px w-6 bg-parish-gold/70" />
                            </div>
                        </div>
                    </Link>

                    <div className="text-right">
                        <p className="font-serif italic text-lg text-parish-gold-light leading-snug">
                            700 lat wiary i wspólnej historii
                        </p>
                        <p className="text-xs text-[#c7d3e3] tracking-wider uppercase mt-0.5">
                            1326 – 2026 &middot; Diecezja Sandomierska
                        </p>
                    </div>
                </div>
            </header>

            {/* PRZYKLEJONA NAWIGACJA (DESKTOP + MOBILE) */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-parish-gold/45 shadow-xs">
                {/* Mobile header bar */}
                <div className="lg:hidden bg-parish-navy text-white px-4 py-3 flex items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 min-w-0"
                    >
                        <div className="w-9 h-9 rounded-lg bg-parish-navy-dark border border-parish-gold/55 flex items-center justify-center shrink-0">
                            <AppLogoIcon className="w-6 h-6 text-parish-gold-light" />
                        </div>
                        <div className="truncate">
                            <div className="font-serif font-semibold text-base leading-tight truncate">
                                Parafia św. Wawrzyńca
                            </div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-parish-gold-light">
                                Olbierzowice
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-lg text-parish-gold-light hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                        aria-label="Otwórz menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Desktop navigation — czysta linia ze złotym podkreśleniem aktywnej zakładki */}
                <nav
                    aria-label="Nawigacja główna"
                    className="hidden lg:flex max-w-7xl mx-auto px-6 items-center justify-between gap-4"
                >
                    <div className="flex items-stretch">
                        {NAV_ITEMS.map((item, idx) => {
                            const Icon = item.icon;
                            const active = isItemActive(item);
                            return (
                                <React.Fragment key={item.href}>
                                    {idx > 0 && (
                                        <span
                                            aria-hidden="true"
                                            className="self-center h-4 w-px bg-parish-border"
                                        />
                                    )}
                                    <Link
                                        href={item.href}
                                        className={`relative inline-flex items-center gap-2 px-4 xl:px-5 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                                            active
                                                ? "text-parish-navy bg-parish-cream/85"
                                                : "text-parish-navy/80 hover:text-parish-navy hover:bg-parish-cream/50"
                                        }`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 transition-colors ${
                                                active
                                                    ? "text-parish-crimson"
                                                    : "text-parish-gold-text"
                                            }`}
                                        />
                                        <span>{item.label}</span>
                                        <span
                                            aria-hidden="true"
                                            className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full transition-all duration-200 ${
                                                active
                                                    ? "bg-parish-gold opacity-100"
                                                    : "bg-parish-gold/40 opacity-0"
                                            }`}
                                        />
                                    </Link>
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold">
                        <a
                            href="tel:+48158661350"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-parish-cream border border-parish-border text-parish-navy hover:border-parish-gold transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5 text-parish-gold-text" />
                            <span>15 866 13 50</span>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100089487466133#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-parish-cream border border-parish-border text-parish-navy hover:border-[#1877F2] hover:text-[#1877F2] transition-colors"
                            aria-label="Facebook parafii"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-3.5 h-3.5"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Facebook</span>
                        </a>
                    </div>
                </nav>
            </div>

            {/* OVERLAY MENU MOBILNEGO */}
            <div
                className={`lg:hidden fixed inset-0 bg-parish-navy-dark/70 backdrop-blur-xs z-40 transition-opacity duration-300 ${
                    isMobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* SZUFLADA MENU MOBILNEGO */}
            <aside
                className={`lg:hidden fixed inset-y-0 right-0 z-50 w-4/5 max-w-xs bg-parish-cream shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-parish-gold/40 ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="bg-parish-navy text-white px-5 py-4 flex items-center justify-between border-b border-parish-gold/40">
                    <div className="flex items-center gap-2.5">
                        <AppLogoIcon className="w-6 h-6 text-parish-gold-light" />
                        <span className="font-serif font-semibold text-base">
                            Menu Parafii
                        </span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1.5 rounded-lg text-parish-gold-light hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Zamknij menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-y-auto p-5 flex flex-col gap-6 flex-1">
                    <nav className="flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const active = isItemActive(item);
                            return (
                                <Link
                                    key={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                                        active
                                            ? "bg-parish-navy text-white shadow-sm"
                                            : "bg-white text-parish-navy border border-parish-border hover:bg-parish-sand"
                                    }`}
                                >
                                    <Icon
                                        className={`w-4 h-4 ${
                                            active
                                                ? "text-parish-gold-light"
                                                : "text-parish-gold-text"
                                        }`}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-parish-border pt-5 flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-parish-gold-text px-1">
                            Linki zewnętrzne
                        </h3>
                        {EXTERNAL_LINKS.map((ext) => (
                            <a
                                key={ext.href}
                                href={ext.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-parish-sand/70 border border-parish-border text-sm font-medium text-parish-navy hover:bg-parish-sand transition-colors"
                            >
                                <span>{ext.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-parish-gold-text" />
                            </a>
                        ))}
                    </div>

                    <div className="mt-auto border-t border-parish-border pt-4 text-xs text-stone-600 space-y-1.5">
                        <a
                            href="tel:+48158661350"
                            className="flex items-center gap-2 font-semibold text-parish-navy"
                        >
                            <Phone className="w-3.5 h-3.5 text-parish-gold-text" />
                            15 866 13 50
                        </a>
                        <p className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-parish-gold-text shrink-0" />
                            Olbierzowice 35, 27-640 Klimontów
                        </p>
                    </div>
                </div>
            </aside>

            {/* OPCJONALNA SEKCJA HERO */}
            {hero}

            {/* BANER 700 LAT (jeśli użyty bez niestandardowego hero) */}
            {showpic && !hero && (
                <div className="bg-parish-navy-dark border-b border-parish-gold/40">
                    <div className="max-w-7xl mx-auto">
                        <img
                            src="/images/700lat.jpeg"
                            alt="700 lat Parafii pw. św. Wawrzyńca w Olbierzowicach"
                            className="hidden lg:block w-full h-auto"
                        />
                        <img
                            src="/images/baner_mobile.jpeg"
                            alt="700 lat Parafii pw. św. Wawrzyńca w Olbierzowicach"
                            className="block lg:hidden w-full h-auto"
                        />
                    </div>
                </div>
            )}

            {/* GŁÓWNA ZAWARTOŚĆ */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
                {children}
            </main>

            {/* STOPKA */}
            <footer className="bg-gradient-to-b from-parish-navy to-parish-navy-dark text-[#dce3ee] border-t-2 border-parish-gold/75 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Kolumna 1: Dane kontaktowe */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-parish-navy-dark border border-parish-gold/55 flex items-center justify-center shrink-0">
                                <AppLogoIcon className="w-6 h-6 text-parish-gold-light" />
                            </div>
                            <div>
                                <h2 className="font-serif font-semibold text-lg text-white leading-tight">
                                    Parafia pw. św. Wawrzyńca
                                </h2>
                                <p className="text-xs uppercase tracking-widest text-parish-gold-light">
                                    w Olbierzowicach
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-2.5 text-sm text-[#c8d4e5]">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-parish-gold-light mt-0.5 shrink-0" />
                                <span>
                                    Olbierzowice 35, 27-640 Klimontów
                                </span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-parish-gold-light shrink-0" />
                                <a
                                    href="tel:+48158661350"
                                    className="hover:text-white transition-colors"
                                >
                                    15 866 13 50
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-parish-gold-light shrink-0" />
                                <a
                                    href="mailto:kontakt@parafia-olbierzowice.pl"
                                    className="hover:text-white transition-colors break-all"
                                >
                                    kontakt@parafia-olbierzowice.pl
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Clock className="w-4 h-4 text-parish-gold-light mt-0.5 shrink-0" />
                                <span>
                                    Kancelaria: pon.–pt. po Mszy św. wieczornej,
                                    sob. 9:00–10:00
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolumna 2: Nawigacja */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-base font-semibold text-parish-gold-light uppercase tracking-wider">
                            Na skróty
                        </h3>
                        <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-[#c8d4e5] hover:text-parish-gold-light transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/?powitanie=1"
                                    className="text-[#c8d4e5] hover:text-parish-gold-light transition-colors"
                                >
                                    Słowo powitalne
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kolumna 3: Linki zewnętrzne i społeczności */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-base font-semibold text-parish-gold-light uppercase tracking-wider">
                            Warto odwiedzić
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {EXTERNAL_LINKS.map((ext) => (
                                <li key={ext.href}>
                                    <a
                                        href={ext.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[#c8d4e5] hover:text-parish-gold-light transition-colors"
                                    >
                                        <span>{ext.label}</span>
                                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                                    </a>
                                </li>
                            ))}
                            <li className="pt-2">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100089487466133#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#1877F2] text-white text-sm font-medium transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span>Parafia na Facebooku</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dolny pasek praw autorskich */}
                <div className="border-t border-white/10 bg-parish-navy-dark/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-[#a8b8cf]">
                        <span>
                            &copy; {new Date().getFullYear()} Parafia pw. św.
                            Wawrzyńca w Olbierzowicach. Wszelkie prawa
                            zastrzeżone.
                        </span>
                        <Link
                            href={auth?.user ? "/admin/dashboard" : "/login"}
                            className="hover:text-parish-gold-light transition-colors font-medium"
                        >
                            {auth?.user ? "Panel Administratora" : "Logowanie"}
                        </Link>
                    </div>
                </div>
            </footer>

            {/* PRZYKLEJONY DOLNY PASEK STOPKI — ZAWSZE WIDOCZNY */}
            <div
                role="contentinfo"
                aria-label="Szybkie informacje kontaktowe parafii"
                className="sticky bottom-0 z-20 bg-parish-navy-dark/95 backdrop-blur-md text-[#dce3ee] border-t border-parish-gold/60 shadow-[0_-4px_18px_rgba(15,32,56,0.22)]"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 min-w-0">
                        <span className="inline-flex items-center gap-1.5 text-[#dce3ee]">
                            <MapPin className="w-3.5 h-3.5 text-parish-gold-light shrink-0" />
                            <span className="hidden sm:inline">
                                Olbierzowice 35, 27-640 Klimontów
                            </span>
                            <span className="sm:hidden">Olbierzowice 35</span>
                        </span>

                        <span
                            aria-hidden="true"
                            className="hidden sm:inline h-3.5 w-px bg-white/20"
                        />

                        <a
                            href="tel:+48158661350"
                            className="inline-flex items-center gap-1.5 text-white hover:text-parish-gold-light font-semibold transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5 text-parish-gold-light shrink-0" />
                            <span>15 866 13 50</span>
                        </a>

                        <span
                            aria-hidden="true"
                            className="hidden lg:inline h-3.5 w-px bg-white/20"
                        />

                        <span className="hidden lg:inline-flex items-center gap-1.5 text-[#c8d4e5]">
                            <Clock className="w-3.5 h-3.5 text-parish-gold-light shrink-0" />
                            <span>
                                Kancelaria: pon.–pt. po Mszy wieczornej, sob.
                                9:00–10:00
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        {formattedVisits !== null && (
                            <span
                                title="Liczba odwiedzin strony parafii"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-parish-gold/35 text-[#e8dfd1] font-medium"
                            >
                                <Eye className="w-3.5 h-3.5 text-parish-gold-light shrink-0" />
                                <span className="hidden sm:inline text-[#c8d4e5]">
                                    Odwiedzin:
                                </span>
                                <span className="font-semibold text-white tabular-nums">
                                    {formattedVisits}
                                </span>
                            </span>
                        )}

                        <p className="hidden md:block font-serif italic text-sm text-parish-gold-light shrink-0">
                            Bóg zapłać za odwiedziny!
                        </p>
                        <Link
                            href="/kontakt"
                            className="md:hidden text-parish-gold-light font-semibold shrink-0"
                        >
                            Kontakt &raquo;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
