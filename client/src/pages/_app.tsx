import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
        </div>
    )
}

export default appWithTranslation(App) 