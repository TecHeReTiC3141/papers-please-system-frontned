import { Specialization, type ShiftEmployee, type User } from '@/entities/user'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  open: boolean
  assignedEmployees: ShiftEmployee[]
  employees: User[]
  onAdd: (employee: ShiftEmployee) => void
  onClose: () => void
}

export function AddEmployeeModal({ employees, assignedEmployees, open, onClose, onAdd }: Props) {
  const { t } = useTranslation()

  const [employeeId, setEmployeeId] = useState('')
  const [specialization, setSpecialization] = useState<Specialization | ''>('')

  if (!open) return null

  const selectedEmployee = employees.find((e) => e.id === employeeId)

  const resetForm = () => {
    setEmployeeId('')
    setSpecialization('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-semibold text-lg mb-4 text-center">{t('employessTable.addModal.title')}</h3>

        <div className="flex flex-col gap-4">
          <select className="select select-bordered" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
            <option value="">{t('employessTable.addModal.employeeId.placeholder')}</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id} disabled={!!assignedEmployees.find((emp) => emp.id === e.id)}>
                {e.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value as Specialization)}
          >
            <option value="">{t('employessTable.addModal.specialization.placeholder')}</option>
            {Object.values(Specialization).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClose}>
            {t('common.actions.cancel')}
          </button>
          <button
            className="btn btn-primary"
            disabled={!selectedEmployee || !specialization}
            onClick={() => {
              if (selectedEmployee && specialization) {
                onAdd({
                  id: selectedEmployee.id,
                  name: selectedEmployee.name,
                  specialization
                })
                handleClose()
              }
            }}
          >
            {t('common.actions.add')}
          </button>
        </div>
      </div>
    </div>
  )
}
