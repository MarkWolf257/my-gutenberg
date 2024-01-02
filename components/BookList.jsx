"use client"

import {
    Button, Input, Pagination, Popover, PopoverContent, PopoverTrigger, Select, SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import SearchBar from "@/components/SearchBar";
import {usePathname, useRouter} from "next/navigation";
import {languageCodes} from "@/lib/languages";

export default function BookList(props) {
    const [page, setPage] = useState(1);
    const [topic, setTopic] = useState(props.topic ?? "");
    const [language, setLanguage] = useState(props.language ?? "");
    const [sort, setSort] = useState("popular");
    const [books, setBooks] = useState(props.data.results);

    const router = useRouter();
    let href = usePathname();



    useEffect(() => {
        setPage(1);

        if (sort === "ascending")
            setBooks([...props.data.results].sort((a, b) => a.title.localeCompare(b.title)));
        else if (sort === "descending")
            setBooks([...props.data.results].sort((a, b) => b.title.localeCompare(a.title)));
        else
            setBooks(props.data.results);

    }, [props, sort]);

    function handleLangChange(event) {
            setLanguage(event.target.value);
    }

    function handleSortChange(event) {
        setSort(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!href.includes('?'))
            href += '?';

        if (topic)
            href += `&&topic=${topic}`;
        if (language)
            href += `&&language=${language}`;

        router.push(href);
    }

    return (
        <div className='max-w-[60rem] flex flex-col gap-4'>
            <SearchBar search={props.search} topic={topic} language={language} />
            <div >
                <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={handleSubmit}
                >
                    <Input
                        label="Subject"
                        isClearable
                        placeholder="single word"
                        value={topic}
                        onValueChange={setTopic}
                    />
                    <Select
                        label="Languages"
                        defaultSelectedKeys={language && language.split(',')}
                        onChange={handleLangChange}
                        selectionMode="multiple"
                        disabledKeys={language ? [""] : []}
                    >
                        {languageCodes.map((obj) => (
                                <SelectItem key={obj.code} value={obj.code}>
                                    {obj.language}
                                </SelectItem>

                        ))}
                    </Select>
                    <input className="hidden" type="submit" value="Submit" />
                    <Select label="Sort by" defaultSelectedKeys={[sort]} onChange={handleSortChange}>
                        <SelectItem key="ascending" value="ascending">
                            Ascending
                        </SelectItem>
                        <SelectItem key="descending" value="descending">
                            Descending
                        </SelectItem>
                        <SelectItem key="popular" value="popular">
                            Popular
                        </SelectItem>
                    </Select>
                </form>
            </div>
            <Table aria-label='Table listing books'>
                <TableHeader>
                    <TableColumn>Cover</TableColumn>
                    <TableColumn>Details</TableColumn>
                    <TableColumn>Links</TableColumn>
                </TableHeader>
                <TableBody>
                    {books.slice((page - 1) * 10, page * 10).map((book) => {
                        return (
                            <TableRow key={book.id}>
                                <TableCell className="w-40">
                                    <Image
                                        className="w-auto h-auto"
                                        src={book.formats['image/jpeg']}
                                        alt='Book Cover'
                                        width={128}
                                        height={128}
                                        unoptimized={true}
                                    />
                                </TableCell>
                                <TableCell>
                                    <h3 className='my-4'>
                                        {book.title.slice(0, 40) + (book.title.length > 40 ? '....' : '')}
                                    </h3>
                                    <p className='leading-7'>
                                        Authors: {book.authors.map((author) => author.name).join('; ')}
                                        <br />
                                        Translators: {book.translators.map((translator) => translator.name).join('; ')}
                                        <br />
                                        Subjects: {book.subjects.join('; ')}
                                        <br />
                                        Languages: {book.languages.join('; ')}
                                    </p>
                                </TableCell>
                                <TableCell height={192} className='flex flex-col items-center justify-evenly'>

                                    <Popover placement="left">
                                        <PopoverTrigger>
                                            <Button color='primary'>Read</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            {Object.keys(book.formats).filter((f) => f.includes('text')).map((f) => {
                                                return (<Link key={f} href={book.formats[f]} target='_blank'>{f.replace(/text\/|;|charset=/g, '')}</Link>);
                                            })}
                                        </PopoverContent>
                                    </Popover>

                                    <Popover placement="left">
                                        <PopoverTrigger>
                                            <Button color='secondary'>Download</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            {Object.keys(book.formats).filter((f) => f.includes('application')).map((f) => {
                                                return (<Link key={f} href={book.formats[f]} target='_blank'>{f.replace(/application\//g, '')}</Link>);
                                            })}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {books.length > 10 && <Pagination  total={Math.ceil(books.length / 10)} page={page} onChange={setPage} />}
        </div>
    )
}