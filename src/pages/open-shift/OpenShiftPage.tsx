import type { Event } from '@/entities/event'
import type { ShiftEmployee, Specialization } from '@/entities/user'
import { useGetBossEmployees, useGetDailyAgenda, useOpenShiftMutation } from '@/features/shifts/model'
import { DailyAgendaTable, EmployeesTable } from '@/features/shifts/ui'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export function OpenShiftPage() {
  const { t } = useTranslation()
  const { data: events, isLoading: eventsLoading } = useGetDailyAgenda()
  const { data: allEmployees = [], isLoading: employeesLoading } = useGetBossEmployees()

  const [eventSpecializations, setEventSpecializations] = useState<Record<string, Specialization | null>>({})

  const handleSetEventSpecialization = (eventId: string, specialization: Specialization | null) => {
    setEventSpecializations((prev) => ({
      ...prev,
      [eventId]: specialization
    }))
  }

  const [assignedEmployees, setAssignedEmployees] = useState<ShiftEmployee[]>([])

  const eventsWithSpecializations = useMemo<Event[]>(() => {
    if (!events) return []

    return events.map((e) => ({
      ...e,
      specialization: eventSpecializations[e.id] ?? e.specialization
    }))
  }, [events, eventSpecializations])

  const openShiftMutation = useOpenShiftMutation()

  const handleOpenShift = () => {
    if (eventsWithSpecializations && eventsWithSpecializations.some(({ specialization }) => specialization === null)) {
      toast.error(t('openShift.agenda.assignSpecializationError'))
      return
    }
    if (assignedEmployees.length < 3) {
      toast.error(t('openShift.inspectors.minInspectorAssignError'))
      return
    }
    toast.promise(openShiftMutation.mutateAsync({ events: eventsWithSpecializations, employees: assignedEmployees }), {
      error: t('openShift.open.error'),
      success: t('openShift.open.success'),
      pending: t('openShift.open.pending')
    })
  }

  const handleAddEmployee = (employee: ShiftEmployee) => setAssignedEmployees((prev) => [...prev, employee])

  const handleDeleteEmployees = (ids: string[]) =>
    setAssignedEmployees((prev) => prev.filter((emp) => !ids.includes(emp.id)))

  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">{t('openShift.title')}</h1>

      <p className="text-base-content/70">{t('openShift.agenda.description')}</p>

      <DailyAgendaTable
        data={eventsWithSpecializations}
        loading={eventsLoading}
        onSpecializationChange={handleSetEventSpecialization}
      />

      <h3 className="text-2xl font-semibold">{t('openShift.inspectors.title')}</h3>

      <EmployeesTable
        employees={assignedEmployees}
        availableEmployees={allEmployees}
        loading={employeesLoading}
        onAdd={handleAddEmployee}
        onDelete={handleDeleteEmployees}
      />
      <button className="btn btn-primary self-end" onClick={handleOpenShift}>
        {t('openShift.openBtn')}
      </button>
    </div>
  )
}
