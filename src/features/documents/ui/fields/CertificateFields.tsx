import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function CertificateFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Certificate type"
        control={<FormikField name="certificateType" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="certificateType" />}
        validationStatus="error"
      />

      <Field
        label="Holder name"
        control={<FormikField name="holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="holderName" />}
        validationStatus="error"
      />

      <Field
        label="Issued by"
        control={<FormikField name="issuedBy" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="issuedBy" />}
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
        label="Additional info"
        control={
          <FormikField
            as="textarea"
            name="additionalInfo"
            className="textarea textarea-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="additionalInfo" />}
        validationStatus="error"
      />
    </div>
  )
}
