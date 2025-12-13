import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function WorkPermitFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Worker name"
        control={<FormikField name="workerName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="workerName" />}
        validationStatus="error"
      />

      <Field
        label="Occupation"
        control={<FormikField name="occupation" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="occupation" />}
        validationStatus="error"
      />

      <Field
        label="Employer"
        control={<FormikField name="employer" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="employer" />}
        validationStatus="error"
      />

      <Field
        label="Issue date"
        control={
          <FormikField
            name="issueDate"
            placeholder="DD.MM.YYYY"
            className="input input-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="issueDate" />}
        validationStatus="error"
      />

      <Field
        label="Expires at"
        control={
          <FormikField
            name="expiresAt"
            placeholder="DD.MM.YYYY"
            className="input input-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="expiresAt" />}
        validationStatus="error"
      />

      <Field
        label="Permit ID"
        control={<FormikField name="permitId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="permitId" />}
        validationStatus="error"
      />
    </div>
  )
}
