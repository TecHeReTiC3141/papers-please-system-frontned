import React from 'react'

interface FieldProps {
  label?: string
  control: React.ReactNode
  message?: React.ReactNode
  validationStatus?: 'error' | 'success' | 'default'
}

export function Field({ label, control, message, validationStatus = 'default' }: FieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-medium">{label}</label>}
      {control}
      {message && validationStatus === 'error' && <p className="text-red-500 text-sm">{message}</p>}
    </div>
  )
}
