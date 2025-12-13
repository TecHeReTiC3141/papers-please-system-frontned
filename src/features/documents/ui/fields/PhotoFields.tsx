import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function PhotoFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Owner name"
        control={<FormikField name="ownerName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="ownerName" />}
        validationStatus="error"
      />

      <Field
        label="Image URL"
        control={<FormikField name="imageUrl" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="imageUrl" />}
        validationStatus="error"
      />

      <Field
        label="Resolution"
        control={
          <FormikField
            name="resolution"
            placeholder="e.g., 600x800"
            className="input input-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="resolution" />}
        validationStatus="error"
      />

      <Field
        label="Taken at"
        control={
          <FormikField name="takenAt" placeholder="DD.MM.YYYY" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="takenAt" />}
        validationStatus="error"
      />
    </div>
  )
}
