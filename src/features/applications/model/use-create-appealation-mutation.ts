import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/shared/api/axios'
import type { AnyDocument } from '@/entities/document/types'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type { User } from '@/entities/user'
import { Priority, TicketStatus, TicketType, type Ticket } from '@/entities/ticket'
import type { TicketRequest } from '@/entities/ticket/types'
import { useNavigate } from 'react-router'

const getDeadline = () => {
  const now = new Date()

  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const oneWeekLaterISO = oneWeekLater.toISOString()

  return oneWeekLaterISO
}

type CreateAppealationParams = {
  applicationId: string
  attachedDocuments: AnyDocument[]
  description: string
}

export const useCreateAppealationMutation = () => {
  const api = useApi()

  const queryClient = useQueryClient()

  const userData = useAuthUser<User>()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ applicationId, attachedDocuments, description }: CreateAppealationParams) => {
      const documents = attachedDocuments.map((document) => ({
        ...document,
        userId: userData?.id ?? '',
        validFrom: new Date(document.validFrom).toISOString(),
        validUntil: new Date(document.validUntil).toISOString()
      }))
      console.log('Attached documents', attachedDocuments)

      const ticketData: TicketRequest = {
        ticketType: TicketType.APPEAL,
        status: TicketStatus.OPEN,
        priority: Priority.LOW,
        deadlineAt: getDeadline(),
        authorId: userData?.id ?? '',
        subjectId: userData?.id ?? '',
        description,
        resolution: null
      }

      const createdDocuments = (
        await Promise.all(documents.map(({ id, ...document }) => api.post<AnyDocument>('/documents', document)))
      ).map(({ data }) => data)

      const { data: createdAppelation } = await api.post<Ticket>('/tickets', ticketData)

      await Promise.all(
        createdDocuments.map((document) => api.post(`/tickets/${createdAppelation.id}/documents/${document.id}`))
      )

      await api.post(`/tickets/${applicationId}/related/${createdAppelation.id}`)
      await api.post(`/tickets/${createdAppelation.id}/related/${applicationId}`)

      navigate('/applications')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['applications'] })
    }
  })
}
