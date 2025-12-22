import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { DocumentType, type AnyDocument } from '@/entities/document/types'
import { useDocumentTypeTitles } from '@/features/documents/model'
import { renderDocumentData } from '@/features/documents/lib'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { FaPlus } from 'react-icons/fa6'
import { useMemo } from 'react'

type Props = {
  documents: AnyDocument[]
  onEdit?: (doc: AnyDocument) => void
  onDelete?: (doc: AnyDocument) => void
  onOpenDelegate?: () => void

  /** attach-existing mode */
  selectable?: boolean
  selected?: AnyDocument[]
  onToggleSelect?: (doc: AnyDocument) => void
  isDocumentDisabled?: (doc: AnyDocument) => boolean

  inspectorMode?: boolean
}

const DOCUMENT_DO_NOT_REQUIRE_DELEGATION: string[] = [DocumentType.PASSPORT, DocumentType.PHOTO]

const DOCUMENT_TYPE_ORDER: AnyDocument['documentType'][] = [
  DocumentType.PASSPORT,
  DocumentType.VISA,
  DocumentType.CERTIFICATE,
  DocumentType.WORK_PERMIT,
  DocumentType.PHOTO,
  ''
]

export function DocumentsAccordion({
  documents,
  onEdit,
  onDelete,
  onOpenDelegate,
  selectable = false,
  selected = [],
  onToggleSelect,
  isDocumentDisabled,
  inspectorMode = false
}: Props) {
  const { t } = useTranslation()
  const documentTitleMap = useDocumentTypeTitles()

  const sortedDocuments = useMemo(() => {
    return [...documents].sort((a, b) => {
      return DOCUMENT_TYPE_ORDER.indexOf(a.documentType) - DOCUMENT_TYPE_ORDER.indexOf(b.documentType)
    })
  }, [documents])

  if (!sortedDocuments.length) {
    return <div className="text-center text-base-content/60 py-6">{t('ticket.documents.empty')}</div>
  }

  return (
    <div className="join join-vertical w-full">
      {sortedDocuments.map((doc, index) => {
        const isSelected = selected.some((d) => d.id === doc.id)

        return (
          <details
            key={`${doc.documentType}_${index}`}
            className={classNames(
              'collapse collapse-arrow join-item border-2 border-base-300',
              index % 2 && 'bg-base-200'
            )}
          >
            <summary className="collapse-title flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {selectable && (
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={isSelected}
                    disabled={isDocumentDisabled?.(doc)}
                    onChange={() => onToggleSelect?.(doc)}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}

                <span className="text-lg font-medium">
                  {index + 1}. {t(documentTitleMap[doc.documentType])}
                </span>
              </div>

              {!selectable && (
                <div className="flex items-center gap-1">
                  {onEdit && (
                    <button className="btn btn-xs btn-ghost" onClick={() => onEdit(doc)}>
                      <FiEdit2 />
                    </button>
                  )}

                  {onDelete && (
                    <button className="btn btn-xs btn-ghost text-error" onClick={() => onDelete(doc)}>
                      <FiTrash2 />
                    </button>
                  )}

                  {onOpenDelegate && !DOCUMENT_DO_NOT_REQUIRE_DELEGATION.includes(doc.documentType) && (
                    <button className="btn btn-xs btn-ghost btn-primary" onClick={onOpenDelegate}>
                      <FaPlus />
                      {t('ticket.documents.createRelated')}
                    </button>
                  )}
                </div>
              )}
            </summary>

            <div className="collapse-content">{renderDocumentData(doc, inspectorMode)}</div>
          </details>
        )
      })}
    </div>
  )
}
