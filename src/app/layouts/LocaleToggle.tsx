import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' }
]

export function LocaleToggle() {
  const { i18n } = useTranslation()

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)
  }

  return (
    <div className="flex gap-1">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleChangeLanguage(code)}
          className={classNames('btn btn-xs', i18n.language.startsWith(code) ? 'btn-primary' : 'btn-ghost')}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
