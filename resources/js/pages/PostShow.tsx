import React, { useState } from 'react';
import ParishLayout from '@/layouts/ParishLayout';
import { Head, Link } from '@inertiajs/react';

interface Post{
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    created_at: string;
}

interface PostShowProps{
    post: Post;
}

export default function PostShow({ post }: PostShowProps){
    console.log ("Odebrane dane post:", post);

    if(!post){
        return(
            <ParishLayout showpic={false}>
                <div className='p-10 text-center text-red-600 font-bold'>
                    Błąd: Brak danych artykułu lub wpis nie istnieje w bazie
                </div>
            </ParishLayout>
        );
    }
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    
    const MockGallery = post.image_path ? [
        post.image_path,
        `https://picsum.photos/seed/${post.id}a/1200/800`,
        `https://picsum.photos/seed/${post.id}b/1200/800`,
        `https://picsum.photos/seed/${post.id}c/1200/800`,
    ] : [];

    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = () => {
        if (lightboxIndex !== null){
            setLightboxIndex((lightboxIndex + 1) % MockGallery.length);
        }
    };
    const prevImage = () => {
        if (lightboxIndex !== null){
            setLightboxIndex((lightboxIndex - 1 + MockGallery.length) % MockGallery.length);
        }
    };
    
    return(
        <ParishLayout showpic={false}>
            {/* Poprawiono wielkość liter i sposób przekazania zmiennej */}
            <Head title={post.title} />

            <article className="flex flex-col gap-8 w-full mx-auto max-w-4xl bg-white p-6 md:p-10 shadow-sm border-t-4 border-[#dcb98a]">
                <nav className="mb-2">
                    <Link
                        href="/"
                        className="text-[#dcb98a] font-bold text-sm uppercase hover:text-stone-900 transition-colors">
                            « Powrót do aktualności
                    </Link>
                </nav>
                <header className="border-b border-[#cbb085]/30 pb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-stone-800 uppercase tracking-wide leading-tight mb-4">
                        {post.title}
                    </h1>
                    <time className="text-sm font-semibold text-stone-500 tracking-wider">
                        Dodano: {new Date(post.created_at).toLocaleDateString('pl-PL')}
                    </time>
                </header>

                <div className="text-base md:text-lg leading-relaxed text-stone-700 text-justify whitespace-pre-wrap">
                    {post.content}
                </div>

                {MockGallery.length > 0 && (
                    <div className="mt-8 border-t border-stone-100 pt-8">
                        <h3 className="text-lg font-bold text-stone-800 uppercase mb-4 tracking-wider">Fotorelacja</h3>
                       
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {MockGallery.map((imgSrc, index) => (
                                <div key={index}
                                onClick={() => setLightboxIndex(index)}
                                className="aspect-square cursor-pointer overflow-hidden rounded-sm group shadow-sm">
                                <img src={imgSrc}
                                alt={`Zdjęcie ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-300"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    <button onClick={closeLightbox}
                    className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl font-bold transition-colors z-50">
                        
                        &times;
                    </button>
                    <button onClick={prevImage}
                    className="absolute left-4 md:left-10 text-white/70 hover:text-white text-5xl font-bold transition-colors px-4 py-8 z-50 select-none">
                        &#10094;
                    </button>

                    <div className="w-full h-full p-4 md:p-16 flex items-center justify-center">
                        <img
                            src={MockGallery[lightboxIndex]}
                            alt="Powiększone zdjęcie"
                            className="max-w-full max-h-full object-contain rounded-md shadow-2xl"/>
                    </div>

                    <button
                     onClick={nextImage}
                     className="absolute right-4 md:right-10 text-white/70 hover:text-white text-5xl font-bold transition-colors px-4 py-8 z-50 select-none">
                         &#10095;
                     </button>
                     {/* Poprawiono brakujący myślnik w klasie tracking-widest */}
                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest font-semibold">
                        {lightboxIndex + 1} / {MockGallery.length}
                     </div>
                </div>
            )}
        </ParishLayout>
    );
}