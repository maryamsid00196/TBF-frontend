import { createContext, useContext, useState, ReactNode } from 'react'

interface JobApplicationModalContextType {
  isOpen: boolean
  position: string | null
  openJobModal: (position?: string) => void
  closeJobModal: () => void
}

const JobApplicationModalContext = createContext<JobApplicationModalContextType | undefined>(undefined)

export function JobApplicationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<string | null>(null)

  return (
    <JobApplicationModalContext.Provider
      value={{
        isOpen,
        position,
        openJobModal: (pos?: string) => {
          setPosition(pos ?? null)
          setIsOpen(true)
        },
        closeJobModal: () => {
          setIsOpen(false)
          setPosition(null)
        },
      }}
    >
      {children}
    </JobApplicationModalContext.Provider>
  )
}

export function useJobApplicationModal() {
  const ctx = useContext(JobApplicationModalContext)
  if (!ctx) throw new Error('useJobApplicationModal must be used within JobApplicationModalProvider')
  return ctx
}
