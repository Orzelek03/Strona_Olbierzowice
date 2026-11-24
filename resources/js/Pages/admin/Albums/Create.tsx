import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        event_date: "",
        cover_image: null as File | null,
        photos: [] as File[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/albumy");
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Nowy Album - Panel Administratora" />

            <div className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-parish-border border-t-4 border-t-parish-navy text-[#231f1b]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-parish-border pb-5">
                    <div>
                        <Link
                            href="/admin/albumy"
                            className="inline-flex items-center gap-1.5 text-parish-gold-text hover:text-parish-navy text-xs font-semibold uppercase tracking-wider mb-1 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Powrót do listy albumów</span>
                        </Link>
                        <h1 className="font-serif text-2xl font-bold text-parish-navy">
                            Dodaj nowy album do galerii
                        </h1>
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Tytuł albumu
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none"
                                placeholder="np. Dożynki Parafialne 2026"
                            />
                            {errors.title && (
                                <div className="text-red-600 text-xs mt-1.5">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Data wydarzenia
                            </label>
                            <input
                                type="date"
                                value={data.event_date}
                                style={{ colorScheme: "light" }}
                                onChange={(e) =>
                                    setData("event_date", e.target.value)
                                }
                                className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none"
                            />
                            {errors.event_date && (
                                <div className="text-red-600 text-xs mt-1.5">
                                    {errors.event_date}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-parish-cream p-5 rounded-xl border border-parish-border">
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Zdjęcie okładki
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "cover_image",
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                                className="w-full border border-parish-border rounded-lg p-2 bg-white text-stone-600 text-sm cursor-pointer
                                file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md
                                file:text-xs file:font-bold file:uppercase file:tracking-wider file:text-white file:bg-parish-navy
                                hover:file:bg-parish-navy-dark file:transition-colors"
                            />
                            {errors.cover_image && (
                                <div className="text-red-600 text-xs mt-1.5">
                                    {errors.cover_image}
                                </div>
                            )}
                        </div>

                        <div className="bg-parish-cream p-5 rounded-xl border border-parish-border">
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Zdjęcia do galerii
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "photos",
                                        e.target.files
                                            ? Array.from(e.target.files)
                                            : [],
                                    )
                                }
                                className="w-full border border-parish-border rounded-lg p-2 bg-white text-stone-600 text-sm cursor-pointer
                                file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md
                                file:text-xs file:font-bold file:uppercase file:tracking-wider file:text-white file:bg-parish-navy
                                hover:file:bg-parish-navy-dark file:transition-colors"
                            />
                            {errors.photos && (
                                <div className="text-red-600 text-xs mt-1.5">
                                    {errors.photos}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-parish-border">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-parish-navy hover:bg-parish-navy-dark text-white font-semibold tracking-wide text-sm py-3 px-7 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {processing
                                ? "Zapisywanie i wgrywanie plików..."
                                : "Zapisz album"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
