import './globals.css'
import { Inter } from 'next/font/google'
import QueryProvider from '../providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Your App Name',
    description: 'Your app description',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </body>
        </html>
    )
}