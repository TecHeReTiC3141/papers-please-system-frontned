import { Specialization } from '@/entities/user'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type DelegateDocumentModalProps = {
  open: boolean
  onClose: () => void
  onDelegate: (payload: { description: string; specialization: Specialization }) => void
}

export function DelegateDocumentModal({ open, onClose, onDelegate }: DelegateDocumentModalProps) {
  const { t } = useTranslation()

  const [description, setDescription] = useState('')
  const [specialization, setSpecialization] = useState<Specialization | ''>('')

  if (!open) return null

  const handleDelegate = () => {
    if (!specialization) return

    onDelegate({
      description: description.trim(),
      specialization
    })
    onClose()

    setDescription('')
    setSpecialization('')
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t('documents.delegateDocumentModel.title', 'Delegate document')}</h3>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">{t('common.specialization.label', 'Specialization')}</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value as Specialization)}
          >
            <option value="" disabled>
              {t('common.specialization.placeholder')}
            </option>

            {Object.values(Specialization).map((spec) => (
              <option key={spec} value={spec}>
                {t(`common.specialization.${spec.toLowerCase()}`, spec)}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="textarea textarea-bordered w-full mt-4"
          placeholder={t('documents.delegateDocumentModel.descriptionPlaceholder', 'Enter description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {t('common.actions.cancel')}
          </button>
          <button
            className="btn btn-primary"
            disabled={!specialization || description.trim().length === 0}
            onClick={handleDelegate}
          >
            {t('common.actions.save')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
