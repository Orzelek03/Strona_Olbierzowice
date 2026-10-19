import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import ParishLayout from "../../../layouts/ParishLayout";
import ReactQuill from "react-quill-new";
// @ts-ignore
import "react-quill-new/dist/quill.snow.css";

interface Intention {
    id: number;
    title: string;
    content: string;
}

interface EditProps {
    intention: Intention;
}

export default function Edit({ intention }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: intention.title || "",
        content: intention.content || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/intencje/${intention.id}`);
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["clean"],
        ],
    };

    return (
        <ParishLayout showpic={false}>
            <Head title="Edytuj intencję" />
            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                    <h1 className="text-xl font-bold uppercase tracking-wider text-stone-800">
                        Edytuj intencję mszalną
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
                            <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                                Tytuł 
                            </label>
                            <input
                                type="title"
                                value={data.title}
                                style={{ colorScheme: "light" }}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                            />

                            {errors.title && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase mb-2">
                            Treść intencji
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 bg-[#cca572] text-white font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-stone-900 transition-colors disabled:opacity-50 w-full md:w-auto self-start"
                    >
                        {processing ? "Zapisywanie..." : "Zapisz zmiany"}
                    </button>
                </form>
            </div>
        </ParishLayout>
    );
}
