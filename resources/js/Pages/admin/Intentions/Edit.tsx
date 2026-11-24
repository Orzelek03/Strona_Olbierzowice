import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import ReactQuill from "react-quill-new";
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
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Edytuj intencję" />

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
                            Edytuj intencję mszalną
                        </h1>
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
                            Tytuł
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            style={{ colorScheme: "light" }}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-parish-border rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-parish-gold focus:border-parish-gold focus:outline-none text-[#231f1b]"
                        />

                        {errors.title && (
                            <div className="text-red-600 text-xs mt-1.5">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-parish-navy uppercase tracking-wider mb-2">
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
                            {processing ? "Zapisywanie..." : "Zapisz zmiany"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
