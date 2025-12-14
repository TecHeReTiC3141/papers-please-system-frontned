import type { AnyDocument } from '@/entities/document/types'
import { DocumentsAccordion } from '@/features/applications/ui'
import { useGetApplicationDocuments } from '@/features/applications/model'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router'
import { Loader } from '@/shared/ui'
import { FaArrowLeft } from 'react-icons/fa6'

export function ApplicationPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const getApplicationDocuments = useGetApplicationDocuments()

  const {
    data: documents,
    isLoading,
    isError
  } = useQuery<AnyDocument[]>({
    queryKey: ['application-documents', [id]],
    queryFn: () => getApplicationDocuments(id ?? '')
  })

  if (!id) {
    navigate('/not-found')

    return
  }

  if (isLoading) {
    return <Loader text="Loading your application..." />
  }

  if (isError) {
    return <div className="p-8 text-center text-error">Failed to load application documents</div>
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <Link className="link link-hover link-info flex gap-x-2 items-center" to="/applications">
        <FaArrowLeft /> Back to applications
      </Link>
      <h1 className="text-3xl font-semibold text-center">Application documents</h1>

      <div className="bg-base-200 border border-base-300 rounded-xl p-4">
        <DocumentsAccordion documents={documents ?? []} />
      </div>
    </div>
  )
}
