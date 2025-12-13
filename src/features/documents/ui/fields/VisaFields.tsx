import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function VisaFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Holder name"
        control={<FormikField name="holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="holderName" />}
        validationStatus="error"
      />

      <Field
        label="Nationality"
        control={<FormikField name="nationality" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="nationality" />}
        validationStatus="error"
      />

      <Field
        label="Purpose"
        control={
          <FormikField as="select" name="purpose" className="select select-bordered bg-neutral-800 w-full">
            <option value="">Select purpose</option>
            <option value="work">Work</option>
            <option value="visit">Visit</option>
            <option value="transit">Transit</option>
          </FormikField>
        }
        message={<ErrorMessage name="purpose" />}
        validationStatus="error"
      />

      <Field
        label="Duration (days)"
        control={
          <FormikField type="number" name="durationDays" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="durationDays" />}
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
        label="Visa ID"
        control={<FormikField name="visaId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="visaId" />}
        validationStatus="error"
      />
    </div>
  )
}
