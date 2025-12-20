import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { useTranslation } from 'react-i18next'

export function PhotoFields() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label={t('documents.photo.ownerName')}
        control={<FormikField name="body.ownerName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.ownerName" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.photo.resolution')}
        control={
          <FormikField
            name="body.resolution"
            placeholder="e.g. 600x800"
            className="input input-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="body.resolution" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.photo.imageUrl')}
        control={<FormikField name="body.imageUrl" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.imageUrl" />}
        validationStatus="error"
      />
    </div>
  )
}
