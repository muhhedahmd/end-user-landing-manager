

"use client"
import React, { useEffect } from 'react'

const DarkSchema = ({
    children
}: {
    children: React.ReactNode
}) => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.classList.add('dark')
        }
        return () => {
            if (typeof window !== 'undefined') {
                document.body.classList.remove('dark')
            }
        }
    }, [])
    return (
        <div>{children}</div>
    )
}

export default DarkSchema