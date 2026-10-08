import React from 'react';
import {Head, useForm, Link} from '@inertiajs/react';
import ParishLayout from '../../../layouts/ParishLayout';


interface Post{
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    is_published : boolean;
    album_id : number | null;
}

interface EditProps{
    post: Post;
}

export default function Edit({post: postData}: EditProps){
    const{data, setData, post, processing, errors} = useForm({
        _method:'PUT',
        title:postData.title || '',
        content:postData.content || '',
        image: null as File | null,
        photos: [] as File[],
        is_published: postData.is_published,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/aktualnosci/${postData.id}`);
    };

    return(
        <ParishLayout showpic={false}>
            <Head title ={`Edytuj wpis: ${postData.title}`}/>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                    <h1 className="text-xl font-bold uppercase tracking-wider text-stone-800">
                        Edytuj wpis
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
                            Dodaj zdjęcia do posta
                        </label>
                        {postData.album_id &&(
                            <Link
                            href={`/admin/albumy/${postData.album_id}/edytuj`}
                            className='text-[#cca572] text-xs font-bold uppercase hover:text-stone-900 transition-colors'>
                                Zarządzaj obecną galerią &raquo;
                            </Link>
                        )}
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
                        <p className='text-xs text-stone-500 mt-2'>Dodaj nowe zdjęcia do galerii. Żeby usunąć, przejdź do galerii tego wpisu</p>
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
                            Opublikuj (Odznacz żeby ukryć)
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 bg-[#cca572] text-white font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-stone-900 transition-colors disabled:opacity-50"
                    >
                        {processing ? "Zapisywanie..." : "Zapisz zmiany"}
                    </button>
                </form>
            </div>
            
        </ParishLayout>
    )
}