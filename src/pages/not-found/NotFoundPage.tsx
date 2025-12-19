import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">{t('404')}</h1>
      <p className="text-xl">{t('Страница не найдена')}</p>
      <a href="/" className="btn btn-primary">
        {t('На главную')}
      </a>
    </div>
  )
}
