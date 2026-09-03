import React from 'react';
import ParishLayout from '@/layouts/ParishLayout';


interface Announcement{
    id:number;
    title:string;
    content:string;
    created_at:string;
}

interface AnnouncementShowProps{
    announcements: Announcement[];
    title: string;
}
interface PaginationLink{
    url: string | null;
    label: string;
    active: boolean;
}
interface PaginatedData{
    
}

export default function AnnouncementsShow ({announcements, title}: AnnouncementShowProps){
    return(
    <ParishLayout showpic={false}>
        <div className="flex flex-col gap-6 w-full mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">{title}</h1>
            {announcements.map((announcement)=>(
                <article key={announcement.id} className="bg-white p-6 shadow-sm border-l-4 border-[#dcb98a]">
                    <header className='mb-3'>
                        <h2 className="text-lg font-bold text-stone-800 uppercase tracking-wide">
                            {announcement.title}
                        </h2>
                        <span className='text-xs font-semibold text-stone-500 tracking-wider'>
                            {new Date(announcement.created_at).toLocaleDateString('PL-pl')}
                        </span>
                    </header>
                    <div className="text-sm leading-relaxed text-stone-700 text-justify">
                        {announcement.content}
                    </div>
                </article>
            ))}
            {announcements.length === 0 &&(
                <div className='text-center text-stone-500 italic py-8'>
                    Brak ogłoszeń
                </div>
            )}
        </div>
    </ParishLayout>
    );
}