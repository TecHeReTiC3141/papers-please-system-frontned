import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function WorkPermitFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Worker name"
        control={<FormikField name="body.workerName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.workerName" />}
        validationStatus="error"
      />

      <Field
        label="Occupation"
        control={<FormikField name="body.occupation" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.occupation" />}
        validationStatus="error"
      />

      <Field
        label="Employer"
        control={<FormikField name="body.employer" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.employer" />}
        validationStatus="error"
      />

      <Field
        label="Permit ID"
        control={<FormikField name="body.permitId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.permitId" />}
        validationStatus="error"
      />
    </div>
  )
}
