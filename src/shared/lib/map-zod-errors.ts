import type { ZodError } from 'zod'
import { set } from 'lodash'

export const mapZodErrorsToFormik = (errors: ZodError) => {
  const formikErrors: Record<string, string> = {}
  errors.issues.forEach((issue) => {
    const path = issue.path.join('.') // support nested fields
    set(formikErrors, path, issue.message)
  })
  return formikErrors
}
