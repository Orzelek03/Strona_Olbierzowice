import { Head, Link } from "@inertiajs/react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { dashboard } from "@/routes";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 pointer-events-none" />
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
                            <h2 className=" text-lg font-bold text-stone-800 uppercase mb-2">
                                Zarządzanie Galerią
                            </h2>
                            <p className="text-sm text-stone-600 mb-4">
                                Dodawanie, edycja i usuwanie albumów.
                            </p>
                            <Link
                                href="/admin/albumy"
                                className="inline-block bg-[#cca572] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                            >
                                Przejdź do albumów &raquo;
                            </Link>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
                            <h2 className=" text-lg font-bold text-stone-800 uppercase mb-2">
                                Zarządzanie postami
                            </h2>
                            <p className="text-sm text-stone-600 mb-4">
                                Dodawanie, edycja i usuwanie postów.
                            </p>
                            <Link
                                href="/admin/aktualnosci"
                                className="inline-block bg-[#cca572] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                            >
                                Przejdź do postów &raquo;
                            </Link>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
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
