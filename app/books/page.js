import BookList from "@/components/BookList";
import SearchBar from "@/components/SearchBar";

export default async function Books({ searchParams }) {
    let search = searchParams.search;
    search = search?.split("+").join("%20");

    let url = new URL('https://gutendex.com/books');
    if (search) url.searchParams.append('search', search);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    return (
        <main className='m-16 flex flex-col justify-center items-center h-full'>
            <BookList data={data} />
        </main>
    )
}