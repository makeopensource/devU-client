import React, { useState, useEffect } from 'react'
import { Assignment } from 'devu-shared-modules'
import { prettyPrintDate } from 'utils/date.utils'

import LoadingOverlay from 'components/shared/loaders/loadingOverlay'
import PageWrapper from 'components/shared/layouts/pageWrapper'
import ErrorPage from './errorPage'

import RequestService from 'services/request.service'

import styles from './assignmentDetailPage.scss'

const AssignmentDetailPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [assignment, setAssignment] = useState<Assignment | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const currentAssignment = await RequestService.get<Assignment>(`/api/assignments/2`)
      setAssignment(currentAssignment)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingOverlay delay={250} />
  if (error) return <ErrorPage error={error} />

  return (
    <PageWrapper>
      <div className={styles.header}>
        <h1>Assignment Details</h1>
      </div>
      <div className={styles.assignmentBox}>
        {assignment ? (
          <>
            <div className={styles.name}>{assignment.name}</div>
            <div className={styles.subText}>
              <p>{assignment.description}</p>
              <p>
                Due: <b>{prettyPrintDate(assignment.dueDate)}</b>
              </p>
              <p>
                Last day to handin: <b>{prettyPrintDate(assignment.endDate)}</b>
              </p>

              <button className={styles.button}>SUBMIT</button>
            </div>
          </>
        ) : (
          <div>Could not find assignment</div>
        )}
      </div>

      {/* Add submission history here */}
    </PageWrapper>
  )
}

export default AssignmentDetailPage
