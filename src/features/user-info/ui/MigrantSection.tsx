import type { AnyDocument } from '@/entities/document/types'
import type { MigrantExtendedInfo } from '@/entities/user'
import {
  AttachExistingModal,
  DeleteDocumentModal,
  DocumentsAccordion,
  EditDocumentModal,
  FillNewDocumentModal
} from '@/features/applications/ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

type Props = {
  extendedMigrantInfo: MigrantExtendedInfo
}

export function MigrantSection({ extendedMigrantInfo }: Props) {
  const { t } = useTranslation()
  const [isFillNewOpen, setFillNewOpen] = useState(false)
  const [isAttachOpen, setAttachOpen] = useState(false)

  const [attachedDocuments, setAttachedDocuments] = useState<AnyDocument[]>(extendedMigrantInfo.documents)
  const [editingDocument, setEditingDocument] = useState<AnyDocument | null>(null)
  const [deletingDocument, setDeletingDocument] = useState<AnyDocument | null>(null)

  const handleAddDocument = (doc: AnyDocument) => setAttachedDocuments((prev) => [...prev, doc])

  const handleAttachDocuments = (docs: AnyDocument[]) =>
    setAttachedDocuments((prev) => [
      ...prev,
      ...docs.filter((d) => !prev.some((p) => p.documentType === d.documentType))
    ])

  const handleEditDocument = (updatedDoc: AnyDocument) => {
    setAttachedDocuments((prev) => prev.map((d) => (d.documentType === updatedDoc.documentType ? updatedDoc : d)))
  }

  const handleDeleteDocument = () => {
    setAttachedDocuments((prev) => prev.filter((d) => d.documentType !== deletingDocument!.documentType))
    setDeletingDocument(null)
  }

  // TODO: implement correct save of personal documents

  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{t('userInfo.documents.title')}</h2>

        <button className="btn btn-sm btn-primary border rounded-lg" onClick={() => setFillNewOpen(true)}>
          <FiPlus /> {t('userInfo.documents.add')}
        </button>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-xl p-4">
        <DocumentsAccordion documents={attachedDocuments} onEdit={setEditingDocument} onDelete={setDeletingDocument} />
      </div>

      <FillNewDocumentModal
        open={isFillNewOpen}
        onClose={() => setFillNewOpen(false)}
        attachedDocuments={attachedDocuments}
        onSubmit={handleAddDocument}
      />
      <EditDocumentModal
        open={!!editingDocument}
        documentToEdit={editingDocument}
        onClose={() => setEditingDocument(null)}
        onSubmit={handleEditDocument}
      />
      <AttachExistingModal
        open={isAttachOpen}
        onClose={() => setAttachOpen(false)}
        onAttach={handleAttachDocuments}
        attachedDocuments={attachedDocuments}
      />
      <DeleteDocumentModal
        open={!!deletingDocument}
        document={deletingDocument}
        onClose={() => setDeletingDocument(null)}
        onConfirm={handleDeleteDocument}
      />
    </div>
  )
}
