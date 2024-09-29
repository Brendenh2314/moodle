'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Logout() {
    const { logout, currentUser } = useAuth()
    const pathname = usePathname()
    const [clientPathname, setClientPathname] = useState('')

    useEffect(() => {
        // Ensure that the pathname is accessed only on the client
        if (typeof window !== 'undefined') {
            setClientPathname(pathname)
        }
    }, [pathname])

    if (!currentUser) {
        return null
    }

    if (clientPathname === '/') {
        return (
            <Link href={'/dashboard'}>
                <Button text="Go to Dashboard" />
            </Link>
        )
    }

    return (
        <Button text='Logout' clickHandler={logout} />
    )
}
