import { useFormik } from 'formik'
import { loginSchema } from '../lib/validation'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useLogin } from '../model/use-login'
import { Field } from '@shared/ui'

export function LoginForm() {
  const login = useLogin()

  const { handleSubmit, values, errors, handleChange } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: login
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <Field
        label="Email"
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
        label="Пароль"
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
        Войти
      </button>
    </form>
  )
}
