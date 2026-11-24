import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        title: "",
        content: "",
        type: "ogloszenie",
        location: "Olbierzowice",
        is_published: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/ogloszenia");
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Dodaj nowe ogłoszenie" />

            <div className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-parish-border border-t-4 border-t-parish-navy text-[#231f1b]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-parish-border pb-5">
                    <div>
                        <Link
                            href="/admin/ogloszenia"
                            className="inline-flex items-center gap-1.5 text-parish-gold-text hover:text-parish-navy text-xs font-semibold uppercase tracking-wider mb-1 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Powrót do listy ogłoszeń</span>
                        </Link>
                        <h1 className="font-serif text-2xl font-bold text-parish-navy">
                            Dodaj wpis
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                            Tytuł
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="np. Ogłoszenia Duszpasterskie - XXVIII Niedziela Zwykła"
                            className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none"
                        />
                        {errors.title && (
                            <div className="text-red-600 text-xs mt-1.5">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                Typ wpisu
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none bg-white cursor-pointer"
                            >
                                <option value="ogloszenie">Ogłoszenie</option>
                                <option value="katecheza">Katecheza</option>
                            </select>
                            {errors.type && (
                                <div className="text-red-600 text-xs mt-1.5">
                                    {errors.type}
                                </div>
                            )}
                        </div>

                        {data.type === "ogloszenie" && (
                            <div>
                                <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                                    Lokalizacja
                                </label>
                                <select
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="Olbierzowice">
                                        Olbierzowice
                                    </option>
                                    <option value="Nawodzice">Nawodzice</option>
                                </select>
                                {errors.location && (
                                    <div className="text-red-600 text-xs mt-1.5">
                                        {errors.location}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                            Treść
                        </label>
                        <textarea
                            rows={14}
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            placeholder="Wpisz pełną treść ogłoszeń..."
                            className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none resize-y leading-relaxed"
                        />
                        {errors.content && (
                            <div className="text-red-600 text-xs mt-1.5">
                                {errors.content}
                            </div>
                        )}
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
                            Opublikuj natychmiast na stronie
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-parish-border">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-parish-navy hover:bg-parish-navy-dark text-white px-7 py-3 rounded-lg font-semibold text-sm tracking-wide shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {processing
                                ? "Zapisywanie..."
                                : "Zapisz ogłoszenie"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
