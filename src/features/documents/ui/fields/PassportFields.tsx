import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { Region } from '@/entities/upk'

export function PassportFields() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Field
        label="Name"
        control={<FormikField name="fullName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="fullName" />}
        validationStatus="error"
      />

      <Field
        label="Country"
        control={<FormikField name="country" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="country" />}
        validationStatus="error"
      />

      <Field
        label="Date of birth"
        control={
          <FormikField
            name="dateOfBirth"
            placeholder="DD.MM.YYYY"
            className="input input-bordered bg-neutral-800 w-full"
          />
        }
        message={<ErrorMessage name="dateOfBirth" />}
        validationStatus="error"
      />

      <Field
        label="Sex"
        control={
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2">
              <FormikField type="radio" name="sex" value="M" />
              Male
            </label>

            <label className="flex items-center gap-2">
              <FormikField type="radio" name="sex" value="F" />
              Female
            </label>
          </div>
        }
        message={<ErrorMessage name="sex" />}
        validationStatus="error"
      />

      <Field
        label="Region"
        control={
          <FormikField as="select" name="issuingRegion" className="select select-bordered bg-neutral-800 w-full">
            <option value="">Select region</option>
            {Object.values(Region).map((region) => (
              <option key={region} value={region}>
                {region.replace('_', ' ')}
              </option>
            ))}
          </FormikField>
        }
        message={<ErrorMessage name="issuingRegion" />}
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
    </div>
  )
}
