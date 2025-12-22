import type { ShiftEmployee, User } from '@/entities/user'
import { Table } from '@/shared/ui/Table'
import type { TableColumn } from '@/shared/ui/Table/types'
import { FaDeleteLeft, FaPlus } from 'react-icons/fa6'
import { AddEmployeeModal } from './AddEmployeeModal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  employees: ShiftEmployee[]
  availableEmployees: User[]
  loading?: boolean
  onAdd: (employee: ShiftEmployee) => void
  onDelete: (ids: string[]) => void
}

export function EmployeesTable({ employees, availableEmployees, loading = false, onAdd, onDelete }: Props) {
  const { t } = useTranslation()
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const columns: TableColumn<ShiftEmployee>[] = [
    {
      key: 'name',
      label: t('employeesTable.inspector'),
      dataIndex: 'name',
      isSortable: true
    },
    {
      key: 'specialization',
      label: t('employeesTable.specialization'),
      dataIndex: 'specialization'
    }
  ]

  const handleDelete = () => {
    if (selectedRows.length === 0) return
    onDelete(selectedRows as string[])
    setSelectedRows([])
  }

  return (
    <>
      <Table
        data={employees}
        loading={loading}
        columns={columns}
        emptyMessage={t('employessTable.empty')}
        showEmpty
        rowSelection={{
          isEnabled: true,
          selectedRows,
          setSelectedRows
        }}
        toolbarButtons={[
          {
            text: t('employessTable.actions.add'),
            onClick: () => setShowAddEmployee(true),
            icon: <FaPlus />
          },
          {
            text: t('employessTable.actions.delete'),
            onClick: handleDelete,
            icon: <FaDeleteLeft />,
            disabled: selectedRows.length === 0
          }
        ]}
        filterable={false}
      />

      <AddEmployeeModal
        open={showAddEmployee}
        assignedEmployees={employees}
        employees={availableEmployees}
        onClose={() => setShowAddEmployee(false)}
        onAdd={(employee) => {
          onAdd(employee)
          setShowAddEmployee(false)
        }}
      />
    </>
  )
}
