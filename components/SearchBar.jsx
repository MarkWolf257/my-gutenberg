"use client"

import {useRouter} from 'next/navigation';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function SearchBar() {
    const [input, setInput] = useState('');
    const router = useRouter();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            router.push(`/books?search=${input}`);
        }}>
            <Input
                label='Search'
                isClearable
                radius='lg'
                placeholder='Type to search...'
                startContent={<Link href={{pathname: '/books', query: {search: input}}}><FaSearch /></Link>}
                value={input}
                onValueChange={setInput}
            />
        </form>
    );
}

