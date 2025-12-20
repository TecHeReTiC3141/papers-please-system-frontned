import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { useTranslation } from 'react-i18next'

export function WorkPermitFields() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label={t('documents.workPermit.workerName')}
        control={<FormikField name="body.workerName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.workerName" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.workPermit.occupation')}
        control={<FormikField name="body.occupation" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.occupation" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.workPermit.employer')}
        control={<FormikField name="body.employer" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.employer" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.workPermit.permitId')}
        control={<FormikField name="body.permitId" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.permitId" />}
        validationStatus="error"
      />
    </div>
  )
}
