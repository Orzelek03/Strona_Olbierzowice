import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        image: null as File | null,
        photos: [] as File[],
        is_published: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/aktualnosci");
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Dodaj nową aktualność" />

            <div className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-parish-border border-t-4 border-t-parish-navy text-[#231f1b]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-parish-border pb-5">
                    <div>
                        <Link
                            href="/admin/aktualnosci"
                            className="inline-flex items-center gap-1.5 text-parish-gold-text hover:text-parish-navy text-xs font-semibold uppercase tracking-wider mb-1 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Powrót do listy aktualności</span>
                        </Link>
                        <h1 className="font-serif text-2xl font-bold text-parish-navy">
                            Dodaj nowy wpis
                        </h1>
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                            Tytuł wpisu
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none"
                            placeholder="Wpisz tytuł aktualności..."
                        />
                        {errors.title && (
                            <div className="text-red-600 text-xs mt-1.5">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                            Treść
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            rows={10}
                            className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none leading-relaxed"
                            placeholder="Treść relacji, wydarzenia..."
                        />
                        {errors.content && (
                            <div className="text-red-600 text-xs mt-1.5">
                                {errors.content}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-parish-cream p-5 rounded-xl border border-parish-border">
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Miniaturka wpisu (opcjonalnie)
                            </label>
                            <p className="text-xs text-stone-500 mb-3">
                                Główne zdjęcie wyświetlane na karcie
                                aktualności.
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "image",
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
                            {errors.image && (
                                <div className="text-red-600 text-xs mt-1.5">
                                    {errors.image}
                                </div>
                            )}
                        </div>

                        <div className="bg-parish-cream p-5 rounded-xl border border-parish-border">
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Galeria zdjęć pod wpisem (opcjonalnie)
                            </label>
                            <p className="text-xs text-stone-500 mb-3">
                                System automatycznie utworzy album z wybranych
                                zdjęć i dołączy go do wpisu.
                            </p>
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

                    <div className="flex items-center gap-3 bg-parish-cream p-4 rounded-lg border border-parish-border">
                        <input
                            type="checkbox"
                            id="is_published"
                            checked={data.is_published}
                            onChange={(e) =>
                                setData("is_published", e.target.checked)
                            }
                            className="w-5 h-5 accent-parish-navy cursor-pointer"
                        />
                        <label
                            htmlFor="is_published"
                            className="text-sm font-semibold text-parish-navy cursor-pointer"
                        >
                            Opublikuj natychmiast (odznacz, aby zapisać jako
                            ukryty szkic)
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-parish-border">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-parish-navy hover:bg-parish-navy-dark text-white font-semibold tracking-wide text-sm py-3 px-7 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? "Zapisywanie..." : "Dodaj wpis"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
