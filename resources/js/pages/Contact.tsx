import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <ParishLayout showpic={false}>
            <Head title="Kontakt" />
            <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">
                Informacje kontaktowe
            </h1>

            <div className="bg-white/95 backdrop-blur-sm border border-[#cbb085] rounded shadow-sm overflow-hidden">
                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <section>
                            <strong className="text-lg text-stone-700 mb-3 border-b-2 border-[#dcb98a] inline-block pb-1 uppercase tracking-wider w-max">
                                Dane Parafii
                            </strong>
                            <p className="text-stone-700 leading-relaxed mt-2">
                                <span className="font-bold">
                                    Parafia pw. św. Wawrzyńca w Olbierzowicach
                                </span>
                                <br />
                                Olbierzowice 35 <br />
                                27-640 Klimontów
                            </p>
                            <p className="text-stone-700 mt-2">
                                <span className="font-bold">Telefon:</span> 15
                                866 13 50 <br />
                                <span className="font-bold">E-mail:</span>{" "}
                                kontakt@parafia-olbierzowice.pl
                            </p>
                            <p className="text-stone-700 leading-relaxed mt-4">
                                <span className="font-bold">
                                    Kaplica MB Królowej Polski w Nawodzicach
                                </span>{" "}
                                <br />
                                Nawodzice 60 <br />
                                27-640 Klimontów
                            </p>
                        </section>
                        <section>
                            <strong className="text-lg text-stone-800 mb-3 border-b-2 border-[#dcb98a] inline-block pb-1 uppercase tracking-wider w-max">
                                Księża posługujący
                            </strong>
                            <p className="text-stone-700 mt-2">
                                Ks. kan. mgr lic. Zbigniew Kuras - Proboszcz
                            </p>
                            <p className="text-stone-700 mt-2">
                                Ks. mgr Mirosław Martyna - Wikariusz
                            </p>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <strong className="text-lg text-stone-800 mb-3 border-b-2 border-[#dcb98a] inline-block pb-1 uppercase tracking-wider w-max">
                                Msze Święte
                            </strong>
                            <p className="text-stone-700 mt-2">
                                <span className="font-bold">Olbierzowice</span>{" "}
                                <br />
                                <span className="font-bold">
                                    Niedziela:
                                </span>{" "}
                                7:30, 10:30, 12:00, 17:00 (W zimie 16:00) <br />
                                <span className="font-bold">
                                    Na tygodniu:
                                </span>{" "}
                                18:00, 18:30 (W zimie 17:00, 17:30)
                            </p>
                            <p className="text-stone-700 mt-4">
                                <span className="font-bold">Nawodzice</span>{" "}
                                <br />
                                <span className="font-bold">
                                    Niedziela:
                                </span>{" "}
                                9:00
                                <br />
                                <span className="font-bold">
                                    Na tygodniu:
                                </span>{" "}
                                16:30 (15:30 w zimie)
                            </p>
                        </section>

                        <section>
                            <strong className="text-lg text-stone-800 mb-3 border-b-2 border-[#dcb98a] inline-block pb-1 uppercase tracking-wider w-max">
                                Kancelaria Parafialna
                            </strong>
                            <ul className="text-stone-700 space-y-2 mt-2">
                                <li>
                                    <span className="font-bold">
                                        Poniedziałek - Piątek:
                                    </span>{" "}
                                    bezpośrednio po Mszy Świętej wieczornej
                                </li>
                                <li>
                                    <span className="font-bold">Sobota:</span>{" "}
                                    9-10
                                </li>
                                <li>
                                    <span className="font-bold">
                                        Niedziela:
                                    </span>{" "}
                                    Nieczynne
                                </li>
                                <li>
                                    <span className="font-bold items-center">
                                        W nagłych sprawach świadczymy pomoc o
                                        każdej porze
                                    </span>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>

                <div className="h-[450px]  m-10 bg-stone-100 border-t border-[#cbb085]/40 flex">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5058.651576996996!2d21.38448339648213!3d50.65821138653022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d5390c4f8a7b7%3A0xe3830fb837cd1d6!2zS2_Fm2Npw7PFgiBSenltc2tva2F0b2xpY2tpIFB3LiDFm3cuIFdhd3J6ecWEY2E!5e0!3m2!1spl!2spl!4v1789124670666!5m2!1spl!2spl"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </ParishLayout>
    );
}
