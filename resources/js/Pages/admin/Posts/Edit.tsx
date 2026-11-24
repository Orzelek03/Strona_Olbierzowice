import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import React from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    is_published: boolean;
    album_id: number | null;
}

interface EditProps {
    post: Post;
}

export default function Edit({ post: postData }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        title: postData.title || "",
        content: postData.content || "",
        image: null as File | null,
        photos: [] as File[],
        is_published: Boolean(postData.is_published),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/aktualnosci/${postData.id}`);
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title={`Edytuj wpis: ${postData.title}`} />

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
                            Edytuj wpis
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
                            {postData.image_path && (
                                <div className="mb-3">
                                    <p className="text-xs text-stone-500 mb-1.5">
                                        Obecna miniaturka:
                                    </p>
                                    <img
                                        src={postData.image_path}
                                        alt="Miniaturka wpisu"
                                        className="w-36 h-24 object-cover rounded-lg border border-parish-border shadow-xs"
                                    />
                                </div>
                            )}
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
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider">
                                    Dodaj zdjęcia do posta
                                </label>
                                {postData.album_id && (
                                    <Link
                                        href={`/admin/albumy/${postData.album_id}/edytuj`}
                                        className="inline-flex items-center gap-1 text-parish-gold-text text-xs font-bold uppercase hover:text-parish-navy transition-colors"
                                    >
                                        <span>Zarządzaj obecną galerią</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </Link>
                                )}
                            </div>
                            <p className="text-xs text-stone-500 mb-3">
                                Dodaj nowe zdjęcia do galerii. Aby usunąć
                                istniejące zdjęcia, przejdź do edycji albumu.
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
                            Opublikuj (odznacz, żeby ukryć)
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-parish-border">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-parish-navy hover:bg-parish-navy-dark text-white font-semibold tracking-wide text-sm py-3 px-7 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? "Zapisywanie..." : "Zapisz zmiany"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
