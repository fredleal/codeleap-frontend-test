import { Modal } from './Modal'
import { Button } from './Button'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteModal({ isOpen, onClose, onConfirm, isLoading }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Are you sure you want to delete this item?">
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  )
}
