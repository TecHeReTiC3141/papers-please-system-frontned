import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { type AnyDocument } from '@/entities/document/types'
import { DocumentsAccordion } from './DocumentsAccordion'
import { useGetUserDocuments } from '../../model'
import { useTranslation } from 'react-i18next'

type Props = {
  open: boolean
  onClose: () => void
  onAttach: (docs: AnyDocument[]) => void
  attachedDocuments: AnyDocument[]
}

export function AttachExistingModal({ open, onClose, onAttach, attachedDocuments }: Props) {
  const fetchUserDocuments = useGetUserDocuments()
  const { t } = useTranslation()

  const [selected, setSelected] = useState<AnyDocument[]>([])

  const attachedTypes = new Set(attachedDocuments.map((d) => d.documentType))
  const selectedTypes = new Set(selected.map((d) => d.documentType))

  const { data, isLoading } = useQuery({
    queryKey: ['user-documents'],
    queryFn: fetchUserDocuments,
    enabled: open
  })

  const isDisabled = (doc: AnyDocument) => {
    if (attachedTypes.has(doc.documentType)) return true

    if (selectedTypes.has(doc.documentType)) {
      return !selected.some((d) => d.id === doc.id)
    }

    return false
  }

  const toggleSelect = (doc: AnyDocument) => {
    setSelected((prev) => (prev.some((d) => d.id === doc.id) ? prev.filter((d) => d.id !== doc.id) : [...prev, doc]))
  }

  const handleAttach = () => {
    onAttach(
      selected.map(
        ({ id, ...selected }) =>
          ({
            ...selected,
            validFrom: selected.validFrom.split('T')[0] ?? '',
            validUntil: selected.validUntil.split('T')[0] ?? ''
          }) as AnyDocument
      )
    )
    setSelected([])
    onClose()
  }

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">{t('createApplication.attachExistingModal.title')}</h3>

        {isLoading && (
          <div className="py-8 text-center text-base-content/60">
            {t('createApplication.attachExistingModal.loading')}
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <div className="py-8 text-center text-base-content/60">
            {t('createApplication.attachExistingModal.error')}
          </div>
        )}

        {data && data.length > 0 && (
          <DocumentsAccordion
            documents={data}
            selectable
            selected={selected}
            onToggleSelect={toggleSelect}
            isDocumentDisabled={isDisabled}
          />
        )}

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {t('common.actions.cancel')}
          </button>

          <button className="btn btn-primary" disabled={!selected.length} onClick={handleAttach}>
            {t('createApplication.attachExistingModal.attachButton', { count: selected.length })}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
