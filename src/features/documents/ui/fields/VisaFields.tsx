import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { useTranslation } from 'react-i18next'

export function VisaFields() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label={t('Holder name')}
        control={<FormikField name="body.holderName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.holderName" />}
        validationStatus="error"
      />

      <Field
        label={t('Nationality')}
        control={<FormikField name="body.nationality" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.nationality" />}
        validationStatus="error"
      />

      <Field
        label={t('Purpose')}
        control={
          <FormikField as="select" name="body.purpose" className="select select-bordered bg-neutral-800 w-full">
            <option value="">{t('Select purpose')}</option>
            <option value="work">{t('Work')}</option>
            <option value="visit">{t('Visit')}</option>
            <option value="transit">{t('Transit')}</option>
          </FormikField>
        }
        message={<ErrorMessage name="body.purpose" />}
        validationStatus="error"
      />

      <Field
        label={t('Duration (days)')}
        control={
          <FormikField type="number" name="body.durationDays" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="body.durationDays" />}
        validationStatus="error"
      />

      <Field
        label={t('Visa ID')}
        control={<FormikField name="body.visaId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.visaId" />}
        validationStatus="error"
      />
    </div>
  )
}
