import { useState } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

import RealtyConnectPlatform from '@/components/RealtyConnectPlatform'

export default function Home() {
    const { t } = useTranslation('common')

    return (
        <>
            <Head>
                <title>{t('title', 'RealtyConnect - 부동산 투자 커뮤니티')}</title>
                <meta name="description" content={t('description', '한국어와 영어를 지원하는 부동산 투자 커뮤니티 플랫폼')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <RealtyConnectPlatform />
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ko', ['common'])),
        },
    }
} 