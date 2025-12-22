import type { AnyDocument } from '@/entities/document/types'
import { useCreateApplicationMutation } from '@/features/applications/model'
import {
  AttachExistingModal,
  DeleteDocumentModal,
  DocumentsAccordion,
  EditDocumentModal,
  FillNewDocumentModal
} from '@/features/applications/ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa6'
import { FiPlus } from 'react-icons/fi'
import { MdAttachFile } from 'react-icons/md'
import { Link } from 'react-router'
import { toast } from 'react-toastify'

export function CreateApplicationPage() {
  const { t } = useTranslation()
  const [isFillNewOpen, setFillNewOpen] = useState(false)
  const [isAttachOpen, setAttachOpen] = useState(false)

  const [attachedDocuments, setAttachedDocuments] = useState<AnyDocument[]>([])
  const [editingDocument, setEditingDocument] = useState<AnyDocument | null>(null)
  const [deletingDocument, setDeletingDocument] = useState<AnyDocument | null>(null)

  const handleAddDocument = (doc: AnyDocument) => setAttachedDocuments((prev) => [...prev, doc])

  const createApplicationMutation = useCreateApplicationMutation()

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

  return (
    <div className="p-8 flex flex-col gap-8">
      <Link className="link link-hover link-info flex gap-x-2 items-center" to="/applications">
        <FaArrowLeft /> {t('createApplication.backToApplications')}
      </Link>
      <h1 className="text-3xl font-semibold text-center">{t('createApplication.title')}</h1>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{t('createApplication.documents.title')}</h2>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-sm btn-primary border rounded-lg"
            disabled={attachedDocuments.length === 5}
          >
            {t('createApplication.documents.add')}
            <FaChevronDown />
          </button>

          <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box shadow p-2 w-44">
            <li>
              <button className="flex items-center gap-2" onClick={() => setFillNewOpen(true)}>
                <FiPlus /> {t('createApplication.documents.fillNew')}
              </button>
            </li>

            <li>
              <button className="flex items-center gap-2" onClick={() => setAttachOpen(true)}>
                <MdAttachFile /> {t('createApplication.documents.attachExisting')}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-xl p-4">
        <DocumentsAccordion documents={attachedDocuments} onEdit={setEditingDocument} onDelete={setDeletingDocument} />
      </div>

      <button
        className="btn btn-primary self-end"
        disabled={attachedDocuments.length === 0}
        onClick={() =>
          toast.promise(createApplicationMutation.mutateAsync(attachedDocuments), {
            success: t('createApplication.create.success'),
            pending: t('createApplication.create.pending'),
            error: t('createApplication.create.error')
          })
        }
      >
        {createApplicationMutation.isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          t('createApplication.create.btn')
        )}
      </button>

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
