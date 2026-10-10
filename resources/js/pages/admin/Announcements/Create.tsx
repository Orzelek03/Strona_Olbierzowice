import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import ParishLayout from "../../../layouts/ParishLayout";

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
        <ParishLayout showpic={false}>
            <Head title="Dodaj nowe ogłoszenie" />

            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                    <h1 className="text-2xl font-bold uppercase tracking-wider text-stone-800">
                        Dodaj wpis
                    </h1>
                    <Link
                        href="/admin/ogloszenia"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors"
                    >
                        &laquo; Wróć do listy
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Tytuł
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="np. Ogłoszenia Duszpasterskie - XXVIII Niedziela Zwykła"
                            className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                        />
                        {errors.title && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                                Typ wpisu
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none bg-white cursor-pointer"
                            >
                                <option value="ogloszenie">Ogłoszenie</option>
                                <option value="katecheza">Katecheza</option>
                            </select>
                            {errors.type && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.type}
                                </div>
                            )}
                        </div>

                        {data.type === "ogloszenie" && (
                            <div>
                                <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                                    Lokalizacja
                                </label>
                                <select
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="Olbierzowice">
                                        Olbierzowice
                                    </option>
                                    <option value="Nawodzice">Nawodzice</option>
                                </select>
                                {errors.location && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.location}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Treść
                        </label>
                        <textarea
                            rows={12}
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            placeholder="Wpisz pełną treść ogłoszeń..."
                            className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none resize-y"
                        />
                        {errors.content && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.content}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="is_published"
                            checked={data.is_published}
                            onChange={(e) =>
                                setData("is_published", e.target.checked)
                            }
                            className="w-5 h-5 accent-[#cca572] cursor-pointer"
                        />
                        <label
                            htmlFor="is_published"
                            className="ml-2 text-sm font-bold text-stone-700 cursor-pointer"
                        >
                            Opublikuj natychmiast na stronie
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-stone-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#cca572] text-white px-6 py-2 rounded font-bold uppercase tracking-widest hover:bg-stone-900 transition-colors disabled:opacity-50"
                        >
                            {processing
                                ? "Zapisywanie..."
                                : "Zapisz ogłoszenie"}
                        </button>
                    </div>
                </form>
            </div>
        </ParishLayout>
    );
}
