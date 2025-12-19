import { useFormik } from 'formik'
import { loginSchema } from '../lib/validation'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Field } from '@shared/ui'
import type { LoginRequest } from '../model'
import { useTranslation } from 'react-i18next'

type Props = {
  onSubmit: (params: LoginRequest) => Promise<void>
  loading: boolean
}

export function LoginForm({ onSubmit, loading }: Props) {
  const { t } = useTranslation()
  const { handleSubmit, values, errors, handleChange } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <Field
        label={t('login.email')}
        control={
          <input
            name="email"
            type="email"
            className="input input-bordered"
            value={values.email}
            onChange={handleChange}
          />
        }
        message={errors.email}
        validationStatus={errors.email ? 'error' : 'default'}
      />

      <Field
        label={t('login.passport')}
        control={
          <input
            name="password"
            type="password"
            className="input input-bordered"
            value={values.password}
            onChange={handleChange}
          />
        }
        message={errors.password}
        validationStatus={errors.password ? 'error' : 'default'}
      />

      <button className="btn btn-primary w-full" type="submit">
        {loading ? <span className="loading loading-spinner loading-lg" /> : t('login.login')}
      </button>
    </form>
  )
}
