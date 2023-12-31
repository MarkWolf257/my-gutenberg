import { FaSearch  } from "react-icons/fa";
import { FaBookOpen, FaFilePdf } from "react-icons/fa6";
import SearchBar from "@/components/SearchBar";
import BookSlide from "@/components/BookSlide";

export default async function Home() {
    const url = new URL('https://gutendex.com/books');
    const res = await fetch(url);
    const data = await res.json();

    return (
        <main>
            <section className='bg-[image:url("/banner.jpg")] bg-cover bg-no-repeat bg-top flex-col'>
                <h1 className='text-white ml-16 mt-32 mb-32 font-mons font-bold'>My Gutenberg</h1>
            </section>


            <section className='flex-row gap-16 justify-center flex-wrap p-16 items-center'>
                <figure className='fig-card'>
                    <FaBookOpen size={56} />
                    <figcaption>Millions of different books to browse from.</figcaption>
                </figure>
                <figure className='fig-card'>
                    <FaFilePdf size={56} />
                    <figcaption>Various different formats to download in.</figcaption>
                </figure>
                <figure className='fig-card'>
                    <FaSearch size={56} />
                    <figcaption>Easily search for your favourite book.</figcaption>
                </figure>
            </section>


            <section className='flex-col gap-8 dark:bg-amber-600 bg-amber-100 items-center'>
                <h2 className='mt-32 text-6xl'>Explore topics</h2>
                <div className='w-80 mb-32'>
                    <SearchBar />
                </div>
            </section>

            <section className='flex-row p-16 justify-center'>
                <BookSlide data={data} />
            </section>
        </main>
    )
}
