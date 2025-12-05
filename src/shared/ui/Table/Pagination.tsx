import type { FC } from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import classNames from 'classnames'
import { Link, useSearchParams } from 'react-router'

type Props = {
  totalPages: number
  currentPage: number
}

const getSteps = (currentPage: number, totalPages: number) => {
  const left = Math.max(currentPage - 2, 1)
  const right = Math.min(currentPage + 2, totalPages)

  return Array.from({ length: right - left + 1 }, (_, i) => i + left)
}

export const Pagination: FC<Props> = ({ totalPages, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const steps = getSteps(currentPage, totalPages)

  const hasPrevButton = steps[0] > 1
  const hasNextButton = (steps.at(-1) ?? 0) < totalPages

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', newPage.toString())
    setSearchParams(newParams)
  }

  return (
    <div className="join">
      {hasPrevButton && (
        <button className="btn join-btn" onClick={() => handlePageChange(currentPage - 1)}>
          <GrFormPrevious />
        </button>
      )}
      {steps.map((page) => (
        <button
          className={classNames('btn join-btn', page === currentPage && 'btn-primary')}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      {hasNextButton && (
        <button className="btn join-btn" onClick={() => handlePageChange(currentPage + 1)}>
          <GrFormNext />
        </button>
      )}
    </div>
  )
}
