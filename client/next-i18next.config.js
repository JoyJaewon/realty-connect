module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['ko'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
} 