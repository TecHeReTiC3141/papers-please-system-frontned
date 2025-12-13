import { useGetApplications } from '@/features/applications/model'
import { ApplicationsBoard, ApplicationsGallery } from '@/features/applications/ui'
import { TicketsBoard } from '@/features/tickets/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { TbTable, TbLayoutGrid } from 'react-icons/tb'
import { Link } from 'react-router'

const APPLICATIONS_VIEW_VAR_NAME = 'applications_view'
type ApplicationsView = 'gallery' | 'board'

export function ApplicationsPage() {
  const fetchApplications = useGetApplications()

  const [view, setView] = useState<ApplicationsView>(() => {
    return (localStorage.getItem(APPLICATIONS_VIEW_VAR_NAME) as ApplicationsView) ?? 'gallery'
  })

  const applications = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications
  })

  useEffect(() => {
    localStorage.setItem(APPLICATIONS_VIEW_VAR_NAME, view)
  }, [view])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-x-3">
        <h1 className="text-3xl font-semibold">Applications</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('gallery')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition cursor-pointer ${
              view === 'gallery' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbTable size={18} />
            Gallery
          </button>

          <button
            onClick={() => setView('board')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition cursor-pointer ${
              view === 'board' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbLayoutGrid size={18} />
            Board
          </button>
        </div>
        <div className="flex-1"></div>
        <Link to="/applications/create" className="btn btn-primary rounded-lg">
          <FaPlus /> Create application
        </Link>
      </div>
      {view === 'gallery' ? (
        <ApplicationsGallery tickets={applications.data?.items ?? []} loading={applications.isPending} />
      ) : (
        <ApplicationsBoard tickets={applications.data?.items ?? []} loading={applications.isPending} />
      )}
    </div>
  )
}
