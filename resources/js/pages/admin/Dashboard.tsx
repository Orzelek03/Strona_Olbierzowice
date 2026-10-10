import { Head, Link } from "@inertiajs/react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { dashboard } from "@/routes";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    
                    {/* Karta 1: Galeria */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white shadow-sm p-6 flex flex-col justify-between min-h-[250px]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 pointer-events-none" />
                        <div className="absolute z-10">
                            <h2 className="text-lg font-bold text-stone-800 uppercase mb-2">
                                Zarządzanie Galerią
                            </h2>
                            <p className="text-md text-stone-600 mb-4">
                                Dodawanie, edycja i usuwanie albumów.
                            </p>
                            <Link
                                href="/admin/albumy"
                                className="flex items-center bg-[#cca572] items-center text-white px-9 py-2 rounded text-md font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                            >
                                Przejdź do albumów &raquo;
                            </Link>
                        </div>
                    </div>

                    {/* Karta 2: Posty */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white shadow-sm p-6 flex flex-col justify-between min-h-[160px]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-stone-800 uppercase mb-2">
                                Zarządzanie postami
                            </h2>
                            <p className="text-md text-stone-600 mb-4">
                                Dodawanie, edycja i usuwanie postów.
                            </p>
                            <Link
                                href="/admin/aktualnosci"
                                className="flex items-center bg-[#cca572] items-center text-white px-9 py-2 rounded text-md font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                            >
                                Przejdź do postów &raquo;
                            </Link>
                        </div>
                    </div>

                    {/* Karta 3: Intencje */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white shadow-sm p-6 flex flex-col justify-between min-h-[160px]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 pointer-events-none"/>
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-stone-800 uppercase mb-2">
                                Zarządzanie intencjami
                            </h2>
                            <p className="text-md text-stone-600 mb-4">
                                Dodawanie, edycja i usuwanie intencji.
                            </p>
                            <Link
                                href="/admin/intencje"
                                className="flex items-center bg-[#cca572] items-center text-white px-9 py-2 rounded text-md font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                            >
                                Przejdź do intencji &raquo;
                            </Link>
                        </div>
                    </div>
                    {/*Karta 4: Ogłoszenia i katechezy */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white shadow-sm p-6 flex flex-col justify-between min-h-[160px]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 pointer-events-none"/>
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-stone-800 uppercase mb-2">
                                Zarządzanie Ogłoszeniami
                            </h2>
                            <p className="text-md text-stone-600 mb-4">
                                Dodawanie, edycja i usuwanie ogłoszeń.
                            </p>
                            <Link
                                href="/admin/ogloszenia"
                                className="flex items-center bg-[#cca572] items-center text-white px-9 py-2 rounded text-md font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors">
                                Przejdź do ogłoszeń &raquo;
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 pointer-events-none" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};