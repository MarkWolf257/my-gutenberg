import BookList from "@/components/BookList";
import SearchBar from "@/components/SearchBar";


export const metadata = {
    title: "Books",
    description: "Book list from the search results.",
}

export default async function Books({ searchParams }) {
    let url = new URL('https://gutendex.com/books');

    if (searchParams.search) {
        const search = searchParams.search.split("+").join("%20");
        url.searchParams.append('search', search);
    }

    if (searchParams.topic)
        url.searchParams.append("topic", searchParams.topic);
    if (searchParams.language)
        url.searchParams.append("languages", searchParams.language);

    const res = await fetch(url);
    const data = await res.json();

    return (
        <main className='m-16 flex flex-col justify-center items-center h-full'>
            <BookList data={data}
                      search={searchParams.search?.replace('+', ' ')}
                      topic={searchParams.topic}
                      language={searchParams.language}
            />
        </main>
    )
}