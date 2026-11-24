import { Head, Link } from "@inertiajs/react";
import { ArrowRight, BookOpenText, Church, Landmark } from "lucide-react";
import React from "react";
import ParishLayout from "@/layouts/ParishLayout";

const CATEGORIES = [
    {
        title: "Olbierzowice",
        subtitle: "Kościół parafialny pw. św. Wawrzyńca",
        description:
            "Bieżące ogłoszenia duszpasterskie, nabożeństwa oraz informacje dla wspólnoty w Olbierzowicach.",
        href: "/ogloszenia/olbierzowice",
        icon: Church,
    },
    {
        title: "Nawodzice",
        subtitle: "Kaplica pw. Matki Bożej Królowej Polski",
        description:
            "Ogłoszenia duszpasterskie oraz terminy nabożeństw w kaplicy filialnej w Nawodzicach.",
        href: "/ogloszenia/nawodzice",
        icon: Landmark,
    },
    {
        title: "Katechezy",
        subtitle: "Formacja i rozważania",
        description:
            "Katechezy parafialne, materiały formacyjne oraz spotkania duszpasterskie dla wiernych.",
        href: "/katechezy",
        icon: BookOpenText,
    },
];

export default function Announcements() {
    return (
        <ParishLayout showpic={false}>
            <Head title="Ogłoszenia Parafialne" />

            <div className="flex flex-col gap-8 w-full mx-auto max-w-5xl">
                <header className="text-center space-y-2 border-b border-parish-border pb-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-text">
                        Życie Parafii
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parish-navy">
                        Ogłoszenia Parafialne
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
                        Wybierz dział, aby zapoznać się z najnowszymi
                        ogłoszeniami duszpasterskimi oraz archiwum poprzednich
                        tygodni.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CATEGORIES.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.href}
                                href={category.href}
                                className="group bg-white rounded-xl border border-parish-border p-6 shadow-xs hover:shadow-md hover:border-parish-gold transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-parish-navy/5 border border-parish-gold/40 flex items-center justify-center mb-5 group-hover:bg-parish-navy group-hover:border-parish-navy transition-colors">
                                        <Icon className="w-6 h-6 text-parish-gold-text group-hover:text-parish-gold-light transition-colors" />
                                    </div>
                                    <h2 className="font-serif text-xl font-bold text-parish-navy group-hover:text-parish-gold-text transition-colors">
                                        {category.title}
                                    </h2>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-parish-gold-text mt-1 mb-3">
                                        {category.subtitle}
                                    </p>
                                    <p className="text-sm leading-relaxed text-[#463f38]">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-parish-border/70 flex items-center justify-between text-sm font-semibold text-parish-navy group-hover:text-parish-gold-text transition-colors">
                                    <span>Zobacz ogłoszenia</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </ParishLayout>
    );
}
