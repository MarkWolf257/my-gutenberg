"use client"

import React from "react";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logo from "@/components/Logo";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";

export default function MyNavbar() {
    return (
        <Navbar maxWidth='full'>
            <NavbarBrand>
                <Link href='/' className='flex gap-2 flex-center m-2'>
                    <Logo/>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                     <Link href='/books' className='font-josefin text-2xl'>
                         Books
                     </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href='/about' className='font-josefin text-2xl'>
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}