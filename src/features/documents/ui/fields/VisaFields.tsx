import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { useTranslation } from 'react-i18next'

export function VisaFields() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 mt-2 w-full">
      <Field
        label={t('documents.visa.holderName')}
        control={<FormikField name="body.holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.holderName" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.visa.nationality')}
        control={<FormikField name="body.nationality" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.nationality" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.visa.purpose.label')}
        control={
          <FormikField as="select" name="body.purpose" className="select select-bordered bg-neutral-800 w-full">
            <option value="">{t('documents.visa.purpose.placeholder')}</option>
            <option value="work">{t('documents.visa.purpose.work')}</option>
            <option value="visit">{t('documents.visa.purpose.visit')}</option>
            <option value="transit">{t('documents.visa.purpose.transit')}</option>
          </FormikField>
        }
        message={<ErrorMessage name="body.purpose" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.visa.durationDays')}
        control={
          <FormikField type="number" name="body.durationDays" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="body.durationDays" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.visa.visaId')}
        control={<FormikField name="body.visaId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.visaId" />}
        validationStatus="error"
      />
    </div>
  )
}
