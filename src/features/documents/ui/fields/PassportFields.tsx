import { Field as FormikField, ErrorMessage } from 'formik'
import { Field } from '@/shared/ui/Field'
import { Region } from '@/entities/upk'

export function PassportFields() {
  return (
    <div className="flex flex-col gap-4 mt-2 w-full">
      <Field
        label="Full name"
        control={<FormikField name="body.fullName" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.fullName" />}
        validationStatus="error"
      />

      <Field
        label="Country"
        control={<FormikField name="body.country" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.country" />}
        validationStatus="error"
      />

      <Field
        label="Date of birth"
        control={
          <FormikField type="date" name="body.dateOfBirth" className="input input-bordered bg-neutral-800 w-full" />
        }
        message={<ErrorMessage name="body.dateOfBirth" />}
        validationStatus="error"
      />

      <Field
        label="Sex"
        control={
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2">
              <FormikField type="radio" name="body.sex" value="M" />
              Male
            </label>

            <label className="flex items-center gap-2">
              <FormikField type="radio" name="body.sex" value="F" />
              Female
            </label>
          </div>
        }
        message={<ErrorMessage name="body.sex" />}
        validationStatus="error"
      />

      <Field
        label="Issuing region"
        control={
          <FormikField as="select" name="body.issuingRegion" className="select select-bordered bg-neutral-800 w-full">
            <option value="">Select region</option>
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
        label="Passport number"
        control={<FormikField name="body.passportNumber" className="input input-bordered bg-neutral-800 w-full" />}
        message={<ErrorMessage name="body.passportNumber" />}
        validationStatus="error"
      />
    </div>
  )
}
