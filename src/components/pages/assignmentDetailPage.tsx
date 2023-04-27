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
    
    // REPLACE array with single Assignment
    const [assignment, setAssignment] = useState(new Array<Assignment>())
    
    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try {
            // Replace 1 with current assignment
            const assignment = await RequestService.get<Assignment>(`/api/assignments/1`)

            // REPLACE array with single Assignment
            const assignmentArray = [assignment]
            setAssignment(assignmentArray)
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
                <div className={styles.name}>{assignment[0].name}</div>
                <div className={styles.subText}>
                    <p>{assignment[0].description}</p>
                    <p>Due: <b>{prettyPrintDate(assignment[0].dueDate)}</b></p>
                    <p>Last day to handin: <b>{prettyPrintDate(assignment[0].endDate)}</b></p>
                    
                    {/* Add functionality to button */}
                    <button className={styles.button}>SUBMIT</button>
                </div>
            </div>

        {/* Add submission history here */}
        </PageWrapper>
    )
}

export default AssignmentDetailPage