import { useLocation } from 'react-router-dom'

export default function useCheckActiveNav() {
  const { pathname } = useLocation()

  const checkActiveNav = (nav: string) => {
    // Handle root path
    if (nav === '/' && pathname === '/') return true

    // Remove leading slash from both paths for comparison
    const cleanNav = nav.replace(/^\//, '')
    const cleanPath = pathname.replace(/^\//, '')

    // For exact matches
    if (cleanNav === cleanPath) return true

    // For parent routes (only match if it's at the start of the path)
    if (cleanPath.startsWith(cleanNav + '/')) return true

    return false
  }

  return { checkActiveNav }
}
