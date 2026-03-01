import type React from 'react'
import { Helmet } from '@dr.pogodin/react-helmet'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Client MVP" />
      </Helmet>
      <h1>Client MVP</h1>
    </>
  )
}
