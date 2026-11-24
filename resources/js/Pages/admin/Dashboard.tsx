import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    BookOpen,
    ExternalLink,
    Images,
    Megaphone,
    Newspaper,
    Plus,
} from "lucide-react";

const ADMIN_MODULES = [
    {
        title: "Aktualności i Posty",
        description:
            "Publikowanie wpisów z wydarzeń parafialnych wraz z fotorelacjami.",
        indexHref: "/admin/aktualnosci",
        createHref: "/admin/aktualnosci/dodaj",
        icon: Newspaper,
    },
    {
        title: "Ogłoszenia i Katechezy",
        description:
            "Zarządzanie ogłoszeniami dla Olbierzowic, Nawodzic oraz katechezami.",
        indexHref: "/admin/ogloszenia",
        createHref: "/admin/ogloszenia/dodaj",
        icon: Megaphone,
    },
    {
        title: "Intencje Mszalne",
        description:
            "Dodawanie, edycja i porządkowanie tygodniowych intencji mszalnych.",
        indexHref: "/admin/intencje",
        createHref: "/admin/intencje/dodaj",
        icon: BookOpen,
    },
    {
        title: "Galeria i Albumy",
        description:
            "Tworzenie albumów zdjęciowych, zmiana okładek i zarządzanie zdjęciami.",
        indexHref: "/admin/albumy",
        createHref: "/admin/albumy/dodaj",
        icon: Images,
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Panel Administratora" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 w-full">
                {/* Baner powitalny panelu */}
                <div className="w-full rounded-xl bg-gradient-to-r from-parish-navy-dark via-parish-navy to-[#1b365d] text-white p-6 sm:p-8 border border-parish-gold/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-light mb-1">
                            Panel Administratora
                        </p>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                            Parafia pw. św. Wawrzyńca w Olbierzowicach
                        </h1>
                        <p className="text-sm text-[#c7d3e3] mt-1">
                            Wybierz sekcję poniżej lub z bocznego menu, aby
                            zarządzać treścią strony.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-parish-gold text-white hover:text-parish-navy-dark border border-parish-gold/40 text-sm font-semibold transition-colors shrink-0"
                    >
                        <span>Zobacz stronę</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>

                {/* Karty modułów na całą szerokość */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 w-full">
                    {ADMIN_MODULES.map((mod) => {
                        const Icon = mod.icon;
                        return (
                            <div
                                key={mod.indexHref}
                                className="bg-white rounded-xl border border-parish-border border-t-4 border-t-parish-navy shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between gap-6"
                            >
                                <div className="space-y-3">
                                    <div className="w-11 h-11 rounded-xl bg-parish-navy/5 border border-parish-gold/40 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-parish-gold-text" />
                                    </div>
                                    <h2 className="font-serif text-lg font-bold text-parish-navy">
                                        {mod.title}
                                    </h2>
                                    <p className="text-sm text-stone-600 leading-relaxed">
                                        {mod.description}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 pt-2 border-t border-parish-border/70">
                                    <Link
                                        href={mod.indexHref}
                                        className="inline-flex items-center justify-center gap-2 bg-parish-navy hover:bg-parish-navy-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                                    >
                                        <span>Zarządzaj</span>
                                        <ArrowRight className="w-4 h-4 text-parish-gold-light" />
                                    </Link>
                                    <Link
                                        href={mod.createHref}
                                        className="inline-flex items-center justify-center gap-1.5 bg-parish-sand/70 hover:bg-parish-sand text-parish-navy px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5 text-parish-gold-text" />
                                        <span>Dodaj nowy</span>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Kokpit",
            href: "/admin/dashboard",
        },
    ],
};
