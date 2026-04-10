import { createContext, useContext, useState, ReactNode } from 'react'

export interface ContactModalInitial {
  service_interest?: string
}

interface ContactModalContextType {
  isOpen: boolean
  initialData: ContactModalInitial | null
  openModal: (initial?: ContactModalInitial) => void
  closeModal: () => void
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined)

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState<ContactModalInitial | null>(null)

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        initialData,
        openModal: (initial) => {
          setInitialData(initial ?? null)
          setIsOpen(true)
        },
        closeModal: () => {
          setIsOpen(false)
          setInitialData(null)
        },
      }}
    >
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be used within ContactModalProvider')
  return ctx
}
