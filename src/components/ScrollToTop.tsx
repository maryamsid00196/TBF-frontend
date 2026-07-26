import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top of the page on every route change, except when navigating to an in-page hash anchor. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
