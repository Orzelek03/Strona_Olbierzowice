import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "Intencje Mszalne ",
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
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Dodaj nową intencję" />

            <div className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-parish-border border-t-4 border-t-parish-navy">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-parish-border pb-5">
                    <div>
                        <Link
                            href="/admin/intencje"
                            className="inline-flex items-center gap-1.5 text-parish-gold-text hover:text-parish-navy text-xs font-semibold uppercase tracking-wider mb-1 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Powrót do listy intencji</span>
                        </Link>
                        <h1 className="font-serif text-2xl font-bold text-parish-navy">
                            Dodaj nową intencję
                        </h1>
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-xs font-bold text-parish-navy mb-2 uppercase tracking-wider">
                            Tytuł (dopisz datę, np. 19.10 – 25.10)
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none text-[#231f1b]"
                            placeholder="Intencje Mszalne 19.10 – 25.10"
                        />
                        {errors.title && (
                            <span className="text-red-600 text-xs mt-1.5 block">
                                {errors.title}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-parish-navy mb-2 uppercase tracking-wider">
                            Treść intencji
                        </label>
                        <div className="bg-white text-[#231f1b]">
                            <ReactQuill
                                theme="snow"
                                value={data.content}
                                onChange={(val) => setData("content", val)}
                                modules={modules}
                                className="h-[420px] pb-12"
                            />
                        </div>
                        {errors.content && (
                            <span className="text-red-600 text-xs mt-1.5 block">
                                {errors.content}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-parish-border">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-7 py-3 bg-parish-navy hover:bg-parish-navy-dark text-white font-semibold tracking-wide text-sm rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? "Zapisywanie..." : "Dodaj intencję"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
