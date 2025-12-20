import { Formik, Form, Field as FormikField } from 'formik'
import { type AnyDocument } from '@/entities/document/types'
import { DocumentSchema } from '@/features/documents/model'
import { Field } from '@/shared/ui'
import { renderDocumentFields } from '@/features/documents/lib'
import { mapZodErrorsToFormik } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

type Props = {
  open: boolean
  onClose: () => void
  documentToEdit: AnyDocument | null
  onSubmit: (doc: AnyDocument) => void
}

export function EditDocumentModal({ open, onClose, documentToEdit, onSubmit }: Props) {
  const { t } = useTranslation()

  if (!documentToEdit) return null

  const CurrentFields = renderDocumentFields(documentToEdit)

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box w-[500px]">
        <Formik<AnyDocument>
          initialValues={documentToEdit}
          enableReinitialize
          validateOnChange
          validateOnBlur
          validate={(values) => {
            const result = DocumentSchema.safeParse(values)
            return result.success ? {} : mapZodErrorsToFormik(result.error)
          }}
          onSubmit={(values, helpers) => {
            onSubmit(values)
            helpers.resetForm()
            onClose()
          }}
        >
          {({ resetForm }) => {
            const handleClose = () => {
              resetForm()
              onClose()
            }

            return (
              <>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
                  ✕
                </button>

                <h3 className="font-bold text-lg mb-6 text-center">{t('createApplication.editModal.title')}</h3>

                <Form className="flex flex-col gap-4 items-center">
                  <Field
                    label={t('createApplication.typeSelect.label')}
                    control={
                      <input
                        disabled
                        className="input input-bordered bg-neutral-800"
                        value={documentToEdit.documentType
                          .toLowerCase()
                          .replace('_', ' ')
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      />
                    }
                  />

                  {CurrentFields}

                  <Field
                    label={t('documents.validFrom')}
                    control={
                      <FormikField
                        type="date"
                        name="validFrom"
                        disabled={documentToEdit.documentType === ''}
                        className="input input-bordered bg-neutral-800"
                      />
                    }
                  />

                  <Field
                    label={t('documents.validUntil')}
                    control={
                      <FormikField
                        type="date"
                        name="validUntil"
                        disabled={documentToEdit.documentType === ''}
                        className="input input-bordered bg-neutral-800"
                      />
                    }
                  />

                  <label className="flex items-center gap-2 mt-2">
                    <FormikField type="checkbox" name="attachToProfile" />
                    <span>{t('createApplication.attachToProfile')}</span>
                  </label>

                  <button type="submit" className="btn btn-primary mt-2">
                    {t('createApplication.editModal.saveButton')}
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
