"use client"

import Logo from "@/components/Logo";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import {Divider} from "@nextui-org/react";

export default function Footer() {
    return (
        <footer className='flex-col items-center gap-6 dark:bg-amber-600 bg-amber-100'>
            <Link href='/' className='flex gap-2 flex-center mt-12'>
                <Logo />
            </Link>
            <ul className='flex flex-row gap-4'>
                <li>
                    <FaFacebook size={32} />
                </li>
                <li>
                    <FaTwitter size={32} />
                </li>
                <li>
                    <FaInstagram size={32} />
                </li>
            </ul>
            <Divider className='my-4' />
            <p className='mb-6'>All rights reserved.</p>
        </footer>
    )
}