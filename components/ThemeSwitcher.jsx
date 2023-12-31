// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    if (theme === 'light') {
        return (
            <button onClick={() => setTheme('dark')}>
                <MdLightMode size={32} />
            </button>
        )
    } else {
        return (
            <button onClick={() => setTheme('light')}>
                <MdDarkMode size={32} />
            </button>
        )
    }
}