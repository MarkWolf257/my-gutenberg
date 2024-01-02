"use client"

import {cn, usePagination} from "@nextui-org/react";
import Image from "next/image";

export default function BookSlide(props) {
    const {activePage, range, setPage, onNext, onPrevious} = usePagination({
        total: 3,
        showControls: false,
        siblings: 10,
        boundaries: 10,
    });

    const books = props.data.results.slice(0, 3);

    return (
        <div className='flex flex-col gap-4 items-center justify-between min-h-[440px]'>
            <div className='flex flex-row flex-wrap items-center justify-center gap-20'>
                <div className='self-center'>
                    <Image
                        src={books[activePage - 1].formats['image/jpeg']}
                        alt='Book Cover'
                        width={256}
                        height={256}
                        unoptimized={true}
                    />
                </div>
                <div className="flex-1 inline-flex flex-col">
                    <h2>{books[activePage - 1].title}</h2>
                    <h3>{books[activePage - 1].authors.map(author => author.name).join('; ')}</h3>
                    <p>{books[activePage - 1].subjects.map(subject => <span key={subject}>{subject}<br /></span>)}</p>
                </div>
            </div>

            <ul className="flex gap-2">
                {range.map((page) => {
                    return (
                        <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
                            <button
                                className={cn(
                                    "w-full h-full bg-default-300 rounded-full",
                                    activePage === page && "bg-secondary"
                                )}
                                onClick={() => setPage(page)}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}