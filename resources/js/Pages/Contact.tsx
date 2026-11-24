import { Head } from "@inertiajs/react";
import { Church, Clock, Mail, MapPin, Phone, Users } from "lucide-react";
import React from "react";
import ParishLayout from "@/layouts/ParishLayout";

export default function Contact() {
    return (
        <ParishLayout showpic={false}>
            <Head title="Kontakt" />

            <div className="flex flex-col gap-8 w-full mx-auto max-w-5xl">
                <header className="text-center space-y-2 border-b border-parish-border pb-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-text">
                        Kancelaria i Duszpasterstwo
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parish-navy">
                        Informacje kontaktowe
                    </h1>
                </header>

                <div className="bg-white border border-parish-border border-t-4 border-t-parish-navy rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Lewa kolumna */}
                        <div className="space-y-8">
                            <section className="space-y-3">
                                <h2 className="font-serif text-xl font-bold text-parish-navy flex items-center gap-2.5 pb-2 border-b border-parish-border">
                                    <MapPin className="w-5 h-5 text-parish-gold-text shrink-0" />
                                    <span>Dane Parafii</span>
                                </h2>
                                <div className="text-[#38312b] leading-relaxed space-y-3 text-base">
                                    <p>
                                        <span className="font-semibold text-parish-navy block">
                                            Parafia pw. św. Wawrzyńca w
                                            Olbierzowicach
                                        </span>
                                        Olbierzowice 35
                                        <br />
                                        27-640 Klimontów
                                    </p>

                                    <div className="space-y-1.5 pt-1">
                                        <p className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-parish-gold-text shrink-0" />
                                            <span className="font-semibold text-parish-navy">
                                                Telefon:
                                            </span>
                                            <a
                                                href="tel:+48158661350"
                                                className="text-parish-navy underline decoration-parish-gold hover:text-parish-gold-text transition-colors font-medium"
                                            >
                                                15 866 13 50
                                            </a>
                                        </p>
                                        <p className="flex items-center gap-2 flex-wrap">
                                            <Mail className="w-4 h-4 text-parish-gold-text shrink-0" />
                                            <span className="font-semibold text-parish-navy">
                                                E-mail:
                                            </span>
                                            <a
                                                href="mailto:kontakt@parafia-olbierzowice.pl"
                                                className="text-parish-navy underline decoration-parish-gold hover:text-parish-gold-text transition-colors break-all font-medium"
                                            >
                                                kontakt@parafia-olbierzowice.pl
                                            </a>
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-parish-border/60">
                                        <span className="font-semibold text-parish-navy block">
                                            Kaplica MB Królowej Polski w
                                            Nawodzicach
                                        </span>
                                        Nawodzice 60
                                        <br />
                                        27-640 Klimontów
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h2 className="font-serif text-xl font-bold text-parish-navy flex items-center gap-2.5 pb-2 border-b border-parish-border">
                                    <Users className="w-5 h-5 text-parish-gold-text shrink-0" />
                                    <span>Księża posługujący</span>
                                </h2>
                                <ul className="space-y-2.5 text-[#38312b] text-base">
                                    <li className="bg-parish-cream/80 border border-parish-border rounded-lg px-4 py-3">
                                        <span className="font-semibold text-parish-navy block">
                                            Ks. kan. mgr lic. Zbigniew Kuras
                                        </span>
                                        <span className="text-xs uppercase tracking-wider font-semibold text-parish-gold-text">
                                            Proboszcz
                                        </span>
                                    </li>
                                    <li className="bg-parish-cream/80 border border-parish-border rounded-lg px-4 py-3">
                                        <span className="font-semibold text-parish-navy block">
                                            Ks. mgr Mirosław Martyna
                                        </span>
                                        <span className="text-xs uppercase tracking-wider font-semibold text-parish-gold-text">
                                            Wikariusz
                                        </span>
                                    </li>
                                </ul>
                            </section>
                        </div>

                        {/* Prawa kolumna */}
                        <div className="space-y-8">
                            <section className="space-y-3">
                                <h2 className="font-serif text-xl font-bold text-parish-navy flex items-center gap-2.5 pb-2 border-b border-parish-border">
                                    <Church className="w-5 h-5 text-parish-gold-text shrink-0" />
                                    <span>Msze Święte</span>
                                </h2>
                                <div className="space-y-4 text-[#38312b] text-base">
                                    <div className="bg-parish-cream/80 border border-parish-border rounded-lg p-4 space-y-1.5">
                                        <h3 className="font-serif font-bold text-parish-navy text-lg">
                                            Olbierzowice
                                        </h3>
                                        <p>
                                            <span className="font-semibold text-parish-navy">
                                                Niedziela:
                                            </span>{" "}
                                            7:30, 10:30, 12:00, 17:00{" "}
                                            <span className="text-sm text-stone-500">
                                                (w zimie 16:00)
                                            </span>
                                        </p>
                                        <p>
                                            <span className="font-semibold text-parish-navy">
                                                W tygodniu:
                                            </span>{" "}
                                            18:00, 18:30{" "}
                                            <span className="text-sm text-stone-500">
                                                (w zimie 17:00, 17:30)
                                            </span>
                                        </p>
                                    </div>

                                    <div className="bg-parish-cream/80 border border-parish-border rounded-lg p-4 space-y-1.5">
                                        <h3 className="font-serif font-bold text-parish-navy text-lg">
                                            Nawodzice
                                        </h3>
                                        <p>
                                            <span className="font-semibold text-parish-navy">
                                                Niedziela:
                                            </span>{" "}
                                            9:00
                                        </p>
                                        <p>
                                            <span className="font-semibold text-parish-navy">
                                                W tygodniu:
                                            </span>{" "}
                                            16:30{" "}
                                            <span className="text-sm text-stone-500">
                                                (w zimie 15:30)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h2 className="font-serif text-xl font-bold text-parish-navy flex items-center gap-2.5 pb-2 border-b border-parish-border">
                                    <Clock className="w-5 h-5 text-parish-gold-text shrink-0" />
                                    <span>Kancelaria Parafialna</span>
                                </h2>
                                <ul className="text-[#38312b] space-y-2.5 text-base">
                                    <li>
                                        <span className="font-semibold text-parish-navy">
                                            Poniedziałek – Piątek:
                                        </span>{" "}
                                        bezpośrednio po Mszy Świętej wieczornej
                                    </li>
                                    <li>
                                        <span className="font-semibold text-parish-navy">
                                            Sobota:
                                        </span>{" "}
                                        9:00 – 10:00
                                    </li>
                                    <li>
                                        <span className="font-semibold text-parish-navy">
                                            Niedziela:
                                        </span>{" "}
                                        Nieczynne
                                    </li>
                                    <li className="pt-2">
                                        <div className="bg-parish-sand/80 border-l-4 border-parish-crimson px-4 py-2.5 rounded-r-lg text-sm font-semibold text-parish-navy">
                                            W nagłych sprawach świadczymy pomoc
                                            o każdej porze.
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
                        <div className="h-[380px] sm:h-[440px] rounded-xl overflow-hidden border border-parish-border shadow-xs bg-parish-sand">
                            <iframe
                                title="Mapa dojazdu do Parafii w Olbierzowicach"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5058.651576996996!2d21.38448339648213!3d50.65821138653022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d5390c4f8a7b7%3A0xe3830fb837cd1d6!2zS2_Fm2Npw7PFgiBSenltc2tva2F0b2xpY2tpIFB3LiDFm3cuIFdhd3J6ecWEY2E!5e0!3m2!1spl!2spl!4v1789124670666!5m2!1spl!2spl"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ParishLayout>
    );
}
