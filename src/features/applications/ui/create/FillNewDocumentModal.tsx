import { Formik, Form, Field as FormikField } from 'formik'
import { DocumentType, type AnyDocument } from '@/entities/document/types'
import { DocumentSchema } from '@/features/documents/model'
import { getInitialValuesByType } from '@/features/documents/model'
import { Field } from '@/shared/ui'
import { renderDocumentFields } from '@/features/documents/lib'
import { mapZodErrorsToFormik } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

type Props = {
  open: boolean
  onClose: () => void
  attachedDocuments: AnyDocument[]
  onSubmit: (doc: AnyDocument) => void
}

export function FillNewDocumentModal({ open, onClose, attachedDocuments, onSubmit }: Props) {
  const { t } = useTranslation()

  const availableDocumentTypes = Object.values(DocumentType).filter(
    (type) => !attachedDocuments.some((d) => d.documentType === type)
  )

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box w-[500px] p-8">
        <Formik<AnyDocument>
          initialValues={{
            id: '',
            documentType: '',
            attachToProfile: false,
            validFrom: '',
            validUntil: ''
          }}
          validateOnChange
          validateOnBlur
          validate={(values) => {
            const parse = DocumentSchema.safeParse(values)
            const errors = parse.success ? {} : mapZodErrorsToFormik(parse.error)
            console.log('ERRORS', errors)
            return errors
          }}
          enableReinitialize
          onSubmit={(values, helpers) => {
            onSubmit(values)
            helpers.resetForm()
            onClose()
          }}
        >
          {({ values, resetForm, setFieldValue }) => {
            const handleClose = () => {
              onClose()
              resetForm()
            }

            const CurrentFields = renderDocumentFields(values)

            const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
              const newType = e.target.value as DocumentType

              setFieldValue('documentType', newType)

              if (newType) {
                const newInitials = getInitialValuesByType(newType)

                resetForm({
                  values: {
                    ...newInitials,
                    documentType: newType,
                    attachToProfile: true
                  }
                })
              }
            }

            return (
              <>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
                  ✕
                </button>
                <h3 className="font-bold text-lg mb-6 text-center">{t('createApplication.fillNewModal.title')}</h3>

                <Form className="flex flex-col gap-4 items-center">
                  <Field
                    label={t('createApplication.typeSelect.label')}
                    control={
                      <FormikField
                        as="select"
                        name="documentType"
                        className="select select-bordered bg-neutral-800 w-full"
                        onChange={handleSelectType}
                      >
                        <option value="" disabled>
                          {t('createApplication.typeSelect.placeholder')}
                        </option>
                        {availableDocumentTypes.map((t) => (
                          <option key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ')}
                          </option>
                        ))}
                      </FormikField>
                    }
                  />

                  {CurrentFields}

                  <Field
                    label={t('documents.validFrom')}
                    control={
                      <FormikField
                        type="date"
                        name="validFrom"
                        disabled={values.documentType === ''}
                        className="input input-bordered bg-neutral-800 w-full"
                      />
                    }
                  />

                  <Field
                    label={t('documents.validUntil')}
                    control={
                      <FormikField
                        type="date"
                        name="validUntil"
                        disabled={values.documentType === ''}
                        className="input input-bordered bg-neutral-800 w-full"
                      />
                    }
                  />

                  <label className="flex items-center gap-2 mt-2">
                    <FormikField type="checkbox" name="attachToProfile" disabled={values.documentType === ''} />
                    <span>{t('createApplication.attachToProfile')}</span>
                  </label>

                  <button type="submit" className="btn btn-primary mt-2">
                    {t('createApplication.fillNewModal.addButton')}
                  </button>
                </Form>
              </>
            )
          }}
        </Formik>
      </div>
    </dialog>
  )
}
