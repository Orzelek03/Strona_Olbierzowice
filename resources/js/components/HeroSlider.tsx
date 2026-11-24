import { Link } from "@inertiajs/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface SplitSlide {
    type: "split";
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imagePosition?: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
}

interface BannerSlide {
    type: "banner";
    id: string;
    desktopImage: string;
    mobileImage: string;
    alt: string;
}

type Slide = BannerSlide | SplitSlide;

const SLIDES: Slide[] = [
    {
        type: "banner",
        id: "jubileusz-700",
        desktopImage: "/images/700lat.jpeg",
        mobileImage: "/images/baner_mobile.jpeg",
        alt: "700 lat Wspólnoty Wiary — Parafia św. Wawrzyńca w Olbierzowicach",
    },
    {
        type: "split",
        id: "kosciol-zewnatrz",
        eyebrow: "Dziedzictwo od 1326 roku",
        title: "Neogotycka świątynia pw. św. Wawrzyńca",
        description:
            "Ponad siedem wieków wiary, modlitwy i wspólnoty pokoleń. Poznaj bogatą historię naszego kościoła z 64-metrową wieżą oraz kaplicy w Nawodzicach.",
        image: "/images/kosciol-zewnatrz.jpg",
        imageAlt: "Kościół pw. św. Wawrzyńca w Olbierzowicach z zewnątrz",
        imagePosition: "object-top",
        primaryCta: { label: "Poznaj historię parafii", href: "/historia" },
        secondaryCta: { label: "Galeria zdjęć", href: "/galeria" },
    },
    {
        type: "split",
        id: "oltarz-glowny",
        eyebrow: "Życie Liturgiczne",
        title: "Wspólna modlitwa i Eucharystia",
        description:
            "Sprawdź bieżące intencje mszalne, ogłoszenia duszpasterskie dla Olbierzowic i Nawodzic oraz godziny pracy kancelarii parafialnej.",
        image: "/images/oltarz-glowny.jpg",
        imageAlt: "Ołtarz główny w kościele pw. św. Wawrzyńca w Olbierzowicach",
        imagePosition: "object-center",
        primaryCta: { label: "Intencje mszalne", href: "/intencje" },
        secondaryCta: { label: "Ogłoszenia", href: "/ogloszenia" },
    },
];

const AUTO_ADVANCE_MS = 7000;

export default function HeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(deltaX) > 45) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };

    return (
        <section
            aria-label="Prezentacja parafii"
            aria-roledescription="carousel"
            className="relative bg-parish-navy-dark border-b-2 border-parish-gold/45 overflow-hidden select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="max-w-7xl mx-auto relative">
                {/* Jednolita wysokość dla wszystkich slajdów — brak skakania strony */}
                <div className="relative w-full h-[230px] sm:h-[340px] md:h-[400px] lg:h-[460px] xl:h-[510px] overflow-hidden bg-parish-navy-dark">
                    {SLIDES.map((slide, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={slide.id}
                                aria-hidden={!isActive}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                    isActive
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                {slide.type === "banner" ? (
                                    <div className="w-full h-full flex items-center justify-center bg-parish-navy-dark">
                                        <img
                                            src={slide.desktopImage}
                                            alt={slide.alt}
                                            className="hidden lg:block w-full h-full object-cover object-center"
                                        />
                                        <img
                                            src={slide.mobileImage}
                                            alt={slide.alt}
                                            className="block lg:hidden w-full h-full object-cover object-center"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full grid grid-cols-12 bg-gradient-to-r from-parish-navy-dark via-parish-navy to-[#1b365d] relative">
                                        {/* Lewa strona: treść i przyciski */}
                                        <div className="col-span-8 sm:col-span-7 lg:col-span-7 flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-6 relative z-10">
                                            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                                                <span className="h-0.5 w-6 sm:w-8 bg-parish-gold" />
                                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-light">
                                                    {slide.eyebrow}
                                                </span>
                                            </div>

                                            <h2 className="font-serif text-lg sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2 sm:mb-4">
                                                {slide.title}
                                            </h2>

                                            <p className="hidden sm:block text-sm lg:text-base text-[#d2dce9] leading-relaxed max-w-xl mb-6">
                                                {slide.description}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-1 sm:mt-0">
                                                <Link
                                                    href={slide.primaryCta.href}
                                                    tabIndex={isActive ? 0 : -1}
                                                    className="inline-flex items-center gap-2 bg-parish-gold hover:bg-parish-gold-light text-parish-navy-dark font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-colors"
                                                >
                                                    <span>
                                                        {slide.primaryCta.label}
                                                    </span>
                                                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                </Link>

                                                {slide.secondaryCta && (
                                                    <Link
                                                        href={
                                                            slide.secondaryCta
                                                                .href
                                                        }
                                                        tabIndex={
                                                            isActive ? 0 : -1
                                                        }
                                                        className="hidden sm:inline-flex items-center gap-1.5 border border-parish-gold/60 hover:bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                                                    >
                                                        <span>
                                                            {
                                                                slide
                                                                    .secondaryCta
                                                                    .label
                                                            }
                                                        </span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                        {/* Prawa strona: pionowe zdjęcie z miękkim wtopieniem */}
                                        <div className="col-span-4 sm:col-span-5 lg:col-span-5 relative h-full overflow-hidden">
                                            <img
                                                src={slide.image}
                                                alt={slide.imageAlt}
                                                className={`w-full h-full object-cover ${slide.imagePosition ?? "object-center"}`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#1b365d] via-[#1b365d]/20 to-transparent w-20 sm:w-28" />
                                            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-parish-navy-dark/60 to-transparent" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Strzałki poprzedni / następny */}
                    <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Poprzedni slajd"
                        className="hidden sm:flex absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-parish-navy-dark/65 hover:bg-parish-navy-dark border border-parish-gold/45 text-white hover:text-parish-gold-light items-center justify-center backdrop-blur-xs transition-all cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Następny slajd"
                        className="hidden sm:flex absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-parish-navy-dark/65 hover:bg-parish-navy-dark border border-parish-gold/45 text-white hover:text-parish-gold-light items-center justify-center backdrop-blur-xs transition-all cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Kropki nawigacyjne na dole */}
                    <div
                        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-parish-navy-dark/60 backdrop-blur-xs border border-white/10"
                        role="tablist"
                        aria-label="Wybierz slajd"
                    >
                        {SLIDES.map((slide, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={slide.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-label={`Slajd ${index + 1}`}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? "w-7 bg-parish-gold-light"
                                            : "w-2 bg-white/45 hover:bg-white/80"
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
