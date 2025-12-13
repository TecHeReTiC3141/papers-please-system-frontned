import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function VisaFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Holder name"
        control={<FormikField name="body.holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.holderName" />}
        validationStatus="error"
      />

      <Field
        label="Nationality"
        control={<FormikField name="body.nationality" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.nationality" />}
        validationStatus="error"
      />

      <Field
        label="Purpose"
        control={
          <FormikField as="select" name="body.purpose" className="select select-bordered bg-neutral-800 w-full">
            <option value="">Select purpose</option>
            <option value="work">Work</option>
            <option value="visit">Visit</option>
            <option value="transit">Transit</option>
          </FormikField>
        }
        message={<ErrorMessage name="body.purpose" />}
        validationStatus="error"
      />

      <Field
        label="Duration (days)"
        control={
          <FormikField type="number" name="body.durationDays" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="body.durationDays" />}
        validationStatus="error"
      />

      <Field
        label="Visa ID"
        control={<FormikField name="body.visaId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.visaId" />}
        validationStatus="error"
      />
    </div>
  )
}
