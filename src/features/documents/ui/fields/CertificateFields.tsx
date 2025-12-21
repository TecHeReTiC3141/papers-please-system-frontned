import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { useTranslation } from 'react-i18next'

export function CertificateFields() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 mt-2  w-full">
      <Field
        label={t('documents.certificate.certificateType')}
        control={<FormikField name="body.certificateType" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.certificateType" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.certificate.holderName')}
        control={<FormikField name="body.holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.holderName" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.certificate.issuedBy')}
        control={<FormikField name="body.issuedBy" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.issuedBy" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.certificate.additionalInfo')}
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
