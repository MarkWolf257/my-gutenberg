"use client"

import {
    Button, Pagination, Popover, PopoverContent, PopoverTrigger,
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

export default function BookList(props) {
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [props]);

    const books = props.data.results;
    return (
        <div className='max-w-[60rem] flex flex-col gap-4'>
            <SearchBar />
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
                                <TableCell>
                                    <Image src={book.formats['image/jpeg']}
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