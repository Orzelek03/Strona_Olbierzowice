import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import ParishLayout from "../../../layouts/ParishLayout";
import ReactQuill from 'react-quill-new';
// @ts-ignore
import 'react-quill-new/dist/quill.snow.css';


export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/intencje");
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["clean"],
        ],
        clipboard:{
            matchVisual:false,
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title="Dodaj nową intencję" />

            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                    <h1 className="text-xl font-bold uppercase tracking-wider text-stone-800">
                        Dodaj nową intencję
                    </h1>
                    <Link
                        href="/admin/intencje"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors"
                    >
                        &laquo; Powrót do listy
                    </Link>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                                Tytuł (np. Intencje Mszalne 19.10 - 25.10)
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border-stone-300 rounded focus:border-[#dcb98a] focus:ring-[#dcb98a] shadow-sm"
                                placeholder="Wpisz tytuł..."
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                                Treść intencji (Wklej jako tekst)
                            </label>
                            <div className="bg-white">
                                <ReactQuill
                                    theme="snow"
                                    value={data.content}
                                    onChange={(val) => setData("content", val)}
                                    modules={modules}
                                    className="h-96 pb-12"
                                />
                            </div>
                            {errors.content && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.content}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-start mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-[#cbb085] text-white font-bold tracking-wider uppercase text-sm rounded shadow hover:bg-[#bba075] transition-colors disabled:opacity-50"
                            >
                                Dodaj intencję
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ParishLayout>
    );
}
