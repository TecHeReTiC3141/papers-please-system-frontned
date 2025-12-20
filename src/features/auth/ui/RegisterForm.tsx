import { useFormik } from 'formik'
import { registerSchema } from '../lib/validation'
import { Field } from '@shared/ui/Field'
import { useRegister } from '../model/use-register'
import { UserRole } from '@entities/user/types'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useTranslation } from 'react-i18next'

export function RegisterForm() {
  const { t } = useTranslation()

  const register = useRegister()

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: UserRole.MIGRANT,
      upkId: ''
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: register
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <Field
        label={t('register.name')}
        control={
          <input name="name" type="text" className="input input-bordered" value={values.name} onChange={handleChange} />
        }
        message={errors.name}
        validationStatus={errors.name ? 'error' : 'default'}
      />

      <Field
        label={t('register.email')}
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
        label={t('register.password')}
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

      <Field
        label={t('register.role')}
        control={
          <select name="role" className="select select-bordered" value={values.role} onChange={handleChange}>
            <option value="MIGRANT">{t('common.specialization.migrant')}</option>
            <option value="INSPECTOR">{t('common.specialization.inspector')}</option>
            <option value="SECURITY">{t('common.specialization.security')}</option>
            <option value="BOSS">{t('common.specialization.boss')}</option>
          </select>
        }
      />

      <Field
        label={t('register.upkId')}
        control={
          <input
            name="upkId"
            type="text"
            className="input input-bordered"
            value={values.upkId}
            onChange={handleChange}
          />
        }
      />

      <button className="btn btn-primary w-full" type="submit">
        {t('register.register')}
      </button>
    </form>
  )
}
