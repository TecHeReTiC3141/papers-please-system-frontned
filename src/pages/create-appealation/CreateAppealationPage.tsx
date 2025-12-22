import type { AnyDocument } from '@/entities/document/types'
import { useCreateAppealationMutation, useGetApplicationDocuments } from '@/features/applications/model'
import {
  AttachExistingModal,
  DeleteDocumentModal,
  DocumentsAccordion,
  EditDocumentModal,
  FillNewDocumentModal
} from '@/features/applications/ui'
import { Loader } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa6'
import { FiPlus } from 'react-icons/fi'
import { MdAttachFile } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const MIN_APPEAL_DESCRIPTION_LENGTH = 10

export function CreateAppalationPage() {
  const { t } = useTranslation()

  const [isFillNewOpen, setFillNewOpen] = useState(false)
  const [isAttachOpen, setAttachOpen] = useState(false)
  const [appealDescription, setAppealDescription] = useState('')

  const initializedRef = useRef(false)

  const [attachedDocuments, setAttachedDocuments] = useState<AnyDocument[]>([])
  const [editingDocument, setEditingDocument] = useState<AnyDocument | null>(null)
  const [deletingDocument, setDeletingDocument] = useState<AnyDocument | null>(null)

  const handleAddDocument = (doc: AnyDocument) => setAttachedDocuments((prev) => [...prev, doc])

  const createAppelationMutation = useCreateAppealationMutation()

  const { id } = useParams()
  const navigate = useNavigate()

  const getApplicationDocuments = useGetApplicationDocuments()

  const {
    data: documents,
    isLoading,
    isError
  } = useQuery<AnyDocument[]>({
    queryKey: ['application-documents', [id]],
    queryFn: () => getApplicationDocuments(id ?? ''),
    enabled: !!id
  })

  useEffect(() => {
    if (!documents || initializedRef.current) return

    setAttachedDocuments(documents)
    initializedRef.current = true
  }, [documents])

  if (!id) {
    navigate('/not-found')

    return
  }

  if (isLoading) {
    return <Loader text={t('application.loading')} />
  }

  if (isError) {
    return <div className="p-8 text-center text-error">{t('application.error')}</div>
  }

  const handleCreateAppelation = () => {
    if (appealDescription.length < MIN_APPEAL_DESCRIPTION_LENGTH) {
      toast.error(t('createAppealation.create.tooShoftAppealation', { minLength: MIN_APPEAL_DESCRIPTION_LENGTH }))

      return
    }
    toast.promise(
      createAppelationMutation.mutateAsync({ applicationId: id, attachedDocuments, description: appealDescription }),
      {
        success: t('createAppealation.create.success'),
        pending: t('createAppealation.create.pending'),
        error: t('createAppealation.create.error')
      }
    )
  }

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
        <FaArrowLeft /> {t('createAppealation.backToApplications')}
      </Link>
      <h1 className="text-3xl font-semibold text-center">{t('createAppealation.title')}</h1>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{t('createAppealation.documents.title')}</h2>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-sm btn-primary border rounded-lg"
            disabled={attachedDocuments.length === 5}
          >
            {t('createAppealation.documents.add')}
            <FaChevronDown />
          </button>

          <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box shadow p-2 w-44">
            <li>
              <button className="flex items-center gap-2" onClick={() => setFillNewOpen(true)}>
                <FiPlus /> {t('createAppealation.documents.fillNew')}
              </button>
            </li>

            <li>
              <button className="flex items-center gap-2" onClick={() => setAttachOpen(true)}>
                <MdAttachFile /> {t('createAppealation.documents.attachExisting')}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-xl p-4">
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-4">
          <legend className="fieldset-legend">{t('createAppealation.description.label')}</legend>

          <textarea
            className="textarea textarea-bordered w-full bg-neutral-800 min-h-[120px]"
            placeholder={t('createAppealation.description.placeholder', { minLength: MIN_APPEAL_DESCRIPTION_LENGTH })}
            value={appealDescription}
            onChange={(e) => setAppealDescription(e.target.value)}
          />
        </fieldset>

        <DocumentsAccordion documents={attachedDocuments} onEdit={setEditingDocument} onDelete={setDeletingDocument} />
      </div>

      <button
        className="btn btn-primary self-end"
        disabled={attachedDocuments.length === 0}
        onClick={handleCreateAppelation}
      >
        {createAppelationMutation.isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          t('createAppealation.create.btn')
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
