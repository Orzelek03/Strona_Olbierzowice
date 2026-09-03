import React from 'react';
import ParishLayout from '@/layouts/ParishLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';


interface Post{
    id:number;
    title:string;
    content: string;
    image_path:string | null;
    created_at:string;
}
interface PaginationLink{
    url: string|null;
    label:string;
    active:boolean;
}

interface PaginatedPosts{
    data: Post[];
    links: PaginationLink[];
}

interface WelcomeProps {
    posts: PaginatedPosts;
}

export default function Welcome({posts }: WelcomeProps) {
    return (
        <ParishLayout showpic={true}>
            <Head title="Strona Główna" />
            
            <div className="flex flex-col gap-8 w-full mx-auto max-w-5xl">
                <h1 className='text-3xl font-bold uppercase tracking-widest text-center text-stone-900 border-b border-[#cbb085]/30 pb-4'>Aktualności</h1>
                <div className='flex flex-col gap-6'>
                    {posts.data.map((post)=>{
                    const mockGallery = post.image_path ?[
                        post.image_path,
                        `https://picsum.photos/seed/${post.id}a/800/400`,
                        `https://picsum.photos/seed/${post.id}b/800/400`,
                        `https://picsum.photos/seed/${post.id}c/800/400`,
                        `https://picsum.photos/seed/${post.id}d/800/400`,
                    ] :[];
                    const displayImages = mockGallery.slice(0, 3);
                    const remainingCount = mockGallery.length - 3;
                    return(
                        <Link
                            key={post.id}
                            href={'/aktualnosci/${post.id}'}
                            className="block group">
                            <article className="bg-white shadow-sm flex flex-col md:flex-row border-l-4 border-[#dcb98a] group-hover:shadow-md group-hover:bg-stone-50 transition-all duration-300">
                                {/*Text*/}
                                <div className='p-6 flex flex-col flex-grow md:w-3/5 lg:w-2/3'>
                                    <header className='mb-3'>
                                        <h2 className='text-xl font-bold text-stone-800 uppercase tracking-wide line-clamp-2 group-hover:text-[#dcb98a] transition-colors'>
                                            {post.title}
                                        </h2>
                                        <span className='text-xs font-semibold text-stone-500 tracking-wider'>
                                            {new Date(post.created_at).toLocaleDateString('pl-PL')}
                                        </span>
                                    </header>
                                    <div className='text-sm leading-relaxed text-stone-700 text-justify line-clamp-3 md:line-clamp-4'>{post.content}</div>
                                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                                        <span className='text-[#dcb98a] font-bold text-sm uppercase'>
                                            Czytaj dalej... &raquo;
                                        </span>
                                    </div>
                                </div>
                                {/*Photos on the right*/}
                                {displayImages.length > 0 && (
                                    <div className='p-4 md:pl-0 w-full md:w-1/3 flex-shrink-0'>
                                    <div className="grid grid-cols-3 gap-1 h-56 md:h-full min-h-[14rem]">
                                    <div className='col-span-2 relative'>
                                        <img src={displayImages[0]}
                                        alt="main photo"
                                        className='absolute inset-0 w-full h-full object-cover rounded-sm'
                                        />
                                    </div>
                                    <div className='col-span-1 flex flex-col gap-1 h-full'>
                                        <div className='flex-1 relative'>
                                        <img src={displayImages[1]}
                                        alt="second photo"
                                        className='absolute inset-0 w-full h-full object-cover rounded-sm'/>
                                    </div>
                                    
                                    <div className='flex-1 relative'>
                                        <img src={displayImages[2]}
                                        alt='Third photo'
                                        className='absolute inset-0 w-full h-full object-cover rounded-sm'/>
                                        {remainingCount > 0 && (
                                            <div className='absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg md:text-xl rounded-sm'>
                                                +{remainingCount}
                                                </div>
                                            
                                        )}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                    

                                )}
                            </article>
                            </Link>
                    );
                    })}
                </div>
                
            
            {posts.links&&posts.links.length >3 &&(
                <div className='flex flex-wrap justify-center gap-1 mt-8'>
                    {posts.links.map((link,index)=>{
                        const translatedLabel = link.label
                            .replace('Prevoius', 'Poprzednia')
                            .replace('Next', 'Następna');
                        const isUnclickable= !link.url || link.active;

                        return isUnclickable ? (
                            <div 
                            key={index}
                            className={`px-4 py-2 text-sm border flex items-center justify-center ${
                                link.active 
                                ? 'bg-[#dcb98a] text-white border-[#dcb98a] font-bold shadow-sm' 
                                : 'bg-stone-50 text-stone-400 border-stone-200 cursor-not-allowed'
                            }`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: translatedLabel }}/>
                                </div>
                        ):(
                        <Link
                            key={index}
                            href={link.url ?? undefined}
                            preserveScroll
                            className="px-4 py-2 text-sm border-bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center justify-center cursor-pointer">
                            <span dangerouslySetInnerHTML={{__html: translatedLabel }}/>
                            </Link>
                            );
                    })}
                </div>
            )}
                </div>
        </ParishLayout>
    );
}