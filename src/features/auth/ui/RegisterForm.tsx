import { useFormik } from 'formik'
import { registerSchema } from '../lib/validation'
import { Field } from '@shared/ui/Field'
import { useRegister } from '../model/use-register'
import { UserRole } from '@entities/user/types'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export function RegisterForm() {
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
        label="Имя"
        control={
          <input name="name" type="text" className="input input-bordered" value={values.name} onChange={handleChange} />
        }
        message={errors.name}
        validationStatus={errors.name ? 'error' : 'default'}
      />

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

      <Field
        label="Роль"
        control={
          <select name="role" className="select select-bordered" value={values.role} onChange={handleChange}>
            <option value="MIGRANT">MIGRANT</option>
            <option value="INSPECTOR">INSPECTOR</option>
            <option value="SECURITY">SECURITY</option>
            <option value="BOSS">BOSS</option>
          </select>
        }
      />

      <Field
        label="ID УПК"
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
        Зарегистрироваться
      </button>
    </form>
  )
}
