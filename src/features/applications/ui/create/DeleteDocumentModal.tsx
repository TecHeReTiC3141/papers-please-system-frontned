import { type AnyDocument } from '@/entities/document/types'
import { documentTitleMap } from '@/features/documents/model'
import { useTranslation } from 'react-i18next'

type Props = {
  open: boolean
  document: AnyDocument | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDocumentModal({ open, document, onClose, onConfirm }: Props) {
  const { t } = useTranslation()

  if (!open || !document) return null

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{t('createApplication.deleteModal.title')}</h3>

        <p className="text-base-content/80">
          {t('documents.deleteDocumentModel.content')}
          <span className="font-semibold">{t(documentTitleMap[document.documentType])}</span>?
        </p>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {t('common.actions.cancel')}
          </button>

          <button className="btn btn-error" onClick={onConfirm}>
            {t('common.actions.delete')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
