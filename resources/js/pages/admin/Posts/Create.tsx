import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import ParishLayout from "../../../layouts/ParishLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        image: null as File | null, // Główne zdjęcie (miniaturka wpisu)
        photos: [] as File[], // Paczka zdjęć do wygenerowania albumu
        is_published: true, // Domyślnie wpis jest publikowany od razu
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/aktualnosci");
    };

    return (
        <ParishLayout showpic={false}>
            <Head title="Dodaj nową aktualność" />

            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                    <h1 className="text-xl font-bold uppercase tracking-wider text-stone-800">
                        Dodaj nowy wpis
                    </h1>
                    <Link
                        href="/admin/aktualnosci"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors"
                    >
                        &laquo; Powrót do listy
                    </Link>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Tytuł wpisu
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                            placeholder="Wpisz tytuł aktualności..."
                        />
                        {errors.title && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Treść
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            rows={8}
                            className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                            placeholder="Treść ogłoszenia, relacji..."
                        />
                        {errors.content && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.content}
                            </div>
                        )}
                    </div>

                    <div className="bg-stone-50 p-4 rounded border border-stone-200">
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Miniaturka wpisu (opcjonalnie)
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData(
                                    "image",
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            className="w-full border border-stone-300 rounded p-2 bg-white text-stone-600 cursor-pointer
                            file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border file:border-stone-300 file:rounded-sm 
                            file:text-sm file:font-bold file:uppercase file:tracking-wide file:text-stone-800 file:bg-white 
                            hover:file:bg-[#cca572] hover:file:text-white hover:file:border-[#cca572] file:transition-colors"
                        />
                        {errors.image && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    <div className="bg-stone-50 p-4 rounded border border-stone-200">
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Galeria zdjęć pod wpisem (opcjonalnie)
                        </label>
                        <p className="text-xs text-stone-500 mb-3">
                            Jeśli wybierzesz tutaj zdjęcia, system automatycznie
                            utworzy z nich album i dołączy go do tego posta.
                        </p>
                        <input
                            type="file"
                            multiple
                            onChange={(e) =>
                                setData(
                                    "photos",
                                    e.target.files
                                        ? Array.from(e.target.files)
                                        : [],
                                )
                            }
                            className="w-full border border-stone-300 rounded p-2 bg-white text-stone-600 cursor-pointer
                            file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border file:border-stone-300 file:rounded-sm 
                            file:text-sm file:font-bold file:uppercase file:tracking-wide file:text-stone-800 file:bg-white 
                            hover:file:bg-[#cca572] hover:file:text-white hover:file:border-[#cca572] file:transition-colors"
                        />
                        {errors.photos && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.photos}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 bg-stone-50 p-4 rounded border border-stone-200">
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
                            className="text-sm font-bold text-stone-700 cursor-pointer"
                        >
                            Opublikuj natychmiast (odznacz, aby zapisać jako
                            ukryty szkic)
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 bg-[#cca572] text-white font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-stone-900 transition-colors disabled:opacity-50"
                    >
                        {processing ? "Zapisywanie..." : "Dodaj wpis"}
                    </button>
                </form>
            </div>
        </ParishLayout>
    );
}
