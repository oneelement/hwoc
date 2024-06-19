'use client'

type ModalProps = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function Modal({ children, open = true, onClose }: ModalProps) {
  if (!open) return null

  const handleClose = () => {
    onClose()
  }

  return (
    <div onClick={handleClose} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div onClick={(e) => e.stopPropagation() } className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full max-w-sm sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}