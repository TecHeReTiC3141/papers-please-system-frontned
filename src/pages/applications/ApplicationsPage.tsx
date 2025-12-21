import { TicketStatus, type Ticket } from '@/entities/ticket'
import { useCloseApplicationMutation, useGetApplications } from '@/features/applications/model'
import { ApplicationsBoard, ApplicationsGallery, CloseApplicationModal } from '@/features/applications/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPlus } from 'react-icons/fa6'
import { TbTable, TbLayoutGrid } from 'react-icons/tb'
import { Link } from 'react-router'
import { toast } from 'react-toastify'

const APPLICATIONS_VIEW_VAR_NAME = 'applications_view'
type ApplicationsView = 'gallery' | 'board'

export function ApplicationsPage() {
  const { t } = useTranslation()
  const fetchApplications = useGetApplications()

  const [view, setView] = useState<ApplicationsView>(() => {
    return (localStorage.getItem(APPLICATIONS_VIEW_VAR_NAME) as ApplicationsView) ?? 'gallery'
  })

  const applications = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications
  })

  const [applicationToDelete, setApplicationToDelete] = useState<Ticket | null>(null)

  const [showClosed, setShowClosed] = useState(false)

  const closeMutation = useCloseApplicationMutation()

  const handleCloseCancel = () => setApplicationToDelete(null)

  const handleCloseApplication = async () => {
    if (!applicationToDelete) return

    await toast.promise(closeMutation.mutateAsync(applicationToDelete.id), {
      pending: t('applications.close.pending'),
      success: t('applications.close.success'),
      error: t('applications.close.error')
    })

    setApplicationToDelete(null)
  }

  useEffect(() => {
    localStorage.setItem(APPLICATIONS_VIEW_VAR_NAME, view)
  }, [view])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-x-3">
        <h1 className="text-3xl font-semibold">{t('applications.title')}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('gallery')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition cursor-pointer ${
              view === 'gallery' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbTable size={18} />
            {t('applications.view.gallery')}
          </button>

          <button
            onClick={() => setView('board')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition cursor-pointer ${
              view === 'board' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbLayoutGrid size={18} />
            {t('applications.view.board')}
          </button>
        </div>
        <div className="flex-1"></div>
        <label className="label text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={showClosed}
            onChange={(event) => setShowClosed(event.target.checked)}
          />
          {t('application.showEmpty')}
        </label>
        <Link to="/applications/create" className="btn btn-primary rounded-lg">
          <FaPlus /> {t('applications.create')}
        </Link>
      </div>
      {view === 'gallery' ? (
        <ApplicationsGallery
          tickets={(applications.data?.items ?? []).filter(
            (application) => application.status !== TicketStatus.CLOSED || showClosed
          )}
          loading={applications.isPending}
          onCloseApplication={setApplicationToDelete}
        />
      ) : (
        <ApplicationsBoard
          tickets={applications.data?.items ?? []}
          loading={applications.isPending}
          showClosed={showClosed}
          onCloseApplication={setApplicationToDelete}
        />
      )}
      <CloseApplicationModal
        open={!!applicationToDelete}
        onCancel={handleCloseCancel}
        onClose={handleCloseApplication}
      />
    </div>
  )
}
