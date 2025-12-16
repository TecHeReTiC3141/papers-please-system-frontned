import type { Event } from '@/entities/event'
import type { ShiftEmployee, Specialization } from '@/entities/user'
import { useGetBossEmployees, useGetDailyAgenda } from '@/features/shifts/model'
import { DailyAgendaTable, EmployeesTable } from '@/features/shifts/ui'
import { useMemo, useState } from 'react'

export function OpenShiftPage() {
  const { data, isLoading } = useGetDailyAgenda()
  const { data: allEmployees = [], isLoading: employeesLoading } = useGetBossEmployees()

  const [eventSpecializations, setEventSpecializations] = useState<Record<string, Specialization | null>>({})

  const handleSetEventSpecialization = (eventId: string, specialization: Specialization | null) => {
    setEventSpecializations((prev) => ({
      ...prev,
      [eventId]: specialization
    }))
  }

  const [assignedEmployees, setAssignedEmployees] = useState<ShiftEmployee[]>([])

  const eventsWithSpecializations = useMemo<Event[] | null>(() => {
    if (!data) return null

    return data.map((e) => ({
      ...e,
      specialization: eventSpecializations[e.id] ?? e.specialization
    }))
  }, [data, eventSpecializations])

  const handleAddEmployee = (employee: ShiftEmployee) => setAssignedEmployees((prev) => [...prev, employee])

  const handleDeleteEmployees = (ids: string[]) =>
    setAssignedEmployees((prev) => prev.filter((emp) => !ids.includes(emp.id)))

  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Open shift</h1>

      <p className="text-base-content/70">Assign today’s agenda and specializations before opening the shift.</p>

      <DailyAgendaTable
        data={eventsWithSpecializations}
        loading={isLoading}
        onSpecializationChange={handleSetEventSpecialization}
      />

      <EmployeesTable
        employees={assignedEmployees}
        availableEmployees={allEmployees}
        loading={employeesLoading}
        onAdd={handleAddEmployee}
        onDelete={handleDeleteEmployees}
      />
      <button className="btn btn-primary self-end" disabled={assignedEmployees.length < 3}>
        Open shift
      </button>
    </div>
  )
}
