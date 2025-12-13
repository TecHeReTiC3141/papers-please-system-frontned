import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'

export function CertificateFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Certificate type"
        control={<FormikField name="body.certificateType" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.certificateType" />}
        validationStatus="error"
      />

      <Field
        label="Holder name"
        control={<FormikField name="body.holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.holderName" />}
        validationStatus="error"
      />

      <Field
        label="Issued by"
        control={<FormikField name="body.issuedBy" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.issuedBy" />}
        validationStatus="error"
      />

      <Field
        label="Additional info"
        control={
          <FormikField
            as="textarea"
            name="body.additionalInfo"
            className="textarea textarea-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="body.additionalInfo" />}
        validationStatus="error"
      />
    </div>
  )
}
