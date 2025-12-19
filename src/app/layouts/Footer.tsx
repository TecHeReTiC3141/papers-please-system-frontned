import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-base-200 p-4 text-center text-sm">
      {t('footer.text', { date: new Date().getFullYear() })}
    </footer>
  )
}
