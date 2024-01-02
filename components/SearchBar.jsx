"use client"

import {useRouter} from 'next/navigation';
import { useState } from 'react';
import {Button, Input} from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function SearchBar(props) {
    const [input, setInput] = useState(props.search ?? '');
    const router = useRouter();

    function handleSubmit() {
        let href = `/books?search=${input}`;
        console.log(props);

        if (props.topic)
            href += `&&topic=${props.topic}`;
        if (props.language)
            href += `&&language=${props.language}`;

        router.push(href);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <Input
                label='Search'
                isClearable
                radius='lg'
                placeholder='Type to search...'
                startContent={<FaSearch style={{ cursor: "pointer" }} onClick={handleSubmit} />}
                value={input}
                onValueChange={setInput}
            />
        </form>
    );
}

