import React from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import ParishLayout from "../../../layouts/ParishLayout";

interface Photo {
    id: number;
    image_path: string;
}
interface Album {
    id: number;
    title: string;
    event_date: string;
    cover_image: string | null;
    photos: Photo[];
}

export default function Edit({ album }: { album: Album }) {
    const { data, setData, post, processing, errors } = useForm({
        title: album.title,
        event_date: album.event_date,
        cover_image: null as File | null,
        photos: [] as File[],
        _method: "put",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/albumy/${album.id}`);
    };
    const handleDeletePhoto = (photoId: number) => {
        if (confirm("Czy na pewno chcesz usunąć to zdjęcie?")) {
            router.delete(`/admin/zdjecia/${photoId}`, {
                preserveScroll: true,
                onSuccess: () => alert("Zdjęcie zostało usunięte."),
                onError: () => alert("Wystąpił błąd podczas usuwania zdjęcia."),
            });
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title="Edytuj Album - Panel Administratora" />
            <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                    <h1 className="text-xl font-bold uppercase tracking-wider text-stone-800">
                        Edytuj album: {album.title}
                    </h1>
                    <Link
                        href="/admin/albumy"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold"
                    >
                        &laquo; Powrót do listy
                    </Link>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Tytuł albumu
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                            placeholder="Wydarzenie Rok"
                        />
                        {errors.title && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Data wydarzenia
                        </label>
                        <input
                            type="date"
                            value={data.event_date}
                            onChange={(e) =>
                                setData("event_date", e.target.value)
                            }
                            className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                        />
                        {errors.event_date && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.event_date}
                            </div>
                        )}
                    </div>

                    <div className="bg-stone-50 p-4 rounded border border-stone-200">
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Zdjęcie okładki (zostaw puste, by zachować obecne)
                        </label>

                        {album.cover_image && (
                            <div className="mb-3">
                                <p className="text-xs text-stone-500 mb-1">
                                    Obecna okładka:
                                </p>
                                <img
                                    src={album.cover_image}
                                    alt="Okładka"
                                    className="w-32 h-24 object-cover rounded shadow-sm"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            onChange={(e) =>
                                setData(
                                    "cover_image",
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            className="w-full border border-stone-300 rounded p-2 bg-white text-stone-600 cursor-pointer
                            file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border file:border-stone-300 file:rounded-sm 
                            file:text-sm file:font-bold file:uppercase file:tracking-wide file:text-stone-800 file:bg-white 
                            hover:file:bg-[#cca572] hover:file:text-white hover:file:border-[#cca572] file:transition-colors"
                        />
                        {errors.cover_image && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.cover_image}
                            </div>
                        )}
                    </div>

                    <div className="bg-stone-50 p-4 rounded border border-stone-200">
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Dodaj kolejne zdjęcia do galerii
                        </label>
                        <p className="text-xs text-stone-500 mb-3">
                            Wybierz pliki, jeśli chcesz powiększyć ten album o
                            nowe fotografie.
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 bg-[#cca572] text-white font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-stone-900 transition-colors disabled:opacity-50"
                    >
                        {processing
                            ? "Zapisywanie zmian..."
                            : "Zaktualizuj album"}
                    </button>
                </form>
                <div className="mt-12 p-8 border-t border-stone-200">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-stone-800 mb-6">
                        Zdjęcia w albumie
                    </h2>
                    {album.photos && album.photos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {album.photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="relative group border border-stone-200 rounded overflow-hidden shadow-sm"
                                >
                                    <img
                                        src={photo.image_path}
                                        alt="Zdjęcie z galerii"
                                        className="w-full h-32 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeletePhoto(photo.id)
                                        }
                                        className='absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold hover:bg-red-800 shadow
                                        title="Usuń zdjęcie'
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-stone-500 italic">
                            Brak zdjęć w albumie.
                        </p>
                    )}
                </div>
            </div>
        </ParishLayout>
    );
}
