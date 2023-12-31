import Link from 'next/link';

export default function NotFound() {
    return (
        <main className='flex flex-col gap-4 justify-center items-center h-[70vh]'>
            <h1>Not found – 404!</h1>
            <Link className='text-2xl' href="/">Go back to Home</Link>
        </main>
    );
}
