import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { Region } from '@/entities/upk'
import { useTranslation } from 'react-i18next'

export function PassportFields() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 mt-2 w-full">
      <Field
        label={t('documents.passport.name')}
        control={<FormikField name="body.fullName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.fullName" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.passport.country')}
        control={<FormikField name="body.country" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.country" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.passport.dateOfBirth')}
        control={
          <FormikField type="date" name="body.dateOfBirth" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="body.dateOfBirth" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.passport.sex')}
        control={
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2">
              <FormikField type="radio" name="body.sex" value="M" />
              {t('common.sex.male')}
            </label>

            <label className="flex items-center gap-2">
              <FormikField type="radio" name="body.sex" value="F" />
              {t('common.sex.female')}
            </label>
          </div>
        }
        message={<ErrorMessage name="body.sex" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.passport.issuingRegion')}
        control={
          <FormikField as="select" name="body.issuingRegion" className="select select-bordered bg-neutral-800 w-full">
            <option value="">{t('documents.passport.selectRegion')}</option>
            {Object.values(Region).map((region) => (
              <option key={region} value={region}>
                {region.replace('_', ' ')}
              </option>
            ))}
          </FormikField>
        }
        message={<ErrorMessage name="body.issuingRegion" />}
        validationStatus="error"
      />

      <Field
        label={t('documents.passport.passportNumber')}
        control={<FormikField name="body.passportNumber" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.passportNumber" />}
        validationStatus="error"
      />
    </div>
  )
}
