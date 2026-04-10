import { Navigate, useLocation } from 'react-router-dom'

export default function About() {
  const { hash } = useLocation()
  const fragment = hash && hash.length > 1 ? hash.slice(1) : 'story'
  return <Navigate to={{ pathname: '/', hash: fragment }} replace />
}
