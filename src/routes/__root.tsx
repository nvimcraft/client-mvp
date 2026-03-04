import { Helmet } from '@dr.pogodin/react-helmet'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '@/components/ui/Header/Header'
import SkipLink from '@/components/ui/SkipLink/SkipLink'

export const Route = createRootRoute({
  component: () => (
    <>
      <Helmet>
        <meta
          name="description"
          content="Web development insights and ideas."
        />
        <meta name="author" content="RJ Leyva <rjleyva@tutanota.de>" />
      </Helmet>
      <SkipLink />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools aria-hidden="true" />
    </>
  ),
})
