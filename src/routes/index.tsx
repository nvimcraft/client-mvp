import type React from 'react'
import { Helmet } from '@dr.pogodin/react-helmet'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/ui/Hero/Hero'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>nvimcraft | Home Page</title>
      </Helmet>
      <Hero
        greeting="Hello there! "
        wavingEmoji=" 👋🏻"
        about="I'm nvimcraft. I write about web development insights and ideas."
      />
    </>
  )
}
