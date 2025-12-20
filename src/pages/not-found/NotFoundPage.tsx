import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">{t('notFound.title')}</h1>
      <p className="text-xl">{t('notFound.content')}</p>
      <a href="/" className="btn btn-primary">
        {t('notFound.backToMain')}
      </a>
    </div>
  )
}
