interface UnsavedChangesModalProps {
  open: boolean
  onCancel: () => void
  onApply: () => void
}

function UnsavedChangesModal({
  open,
  onCancel,
  onApply,
}: UnsavedChangesModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-fs-border bg-fs-surface p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-fs-text-primary">
          Unsaved Changes
        </h2>

        <p className="mt-2 text-sm leading-6 text-fs-text-secondary">
          You have unsaved changes. Would you like to apply them before
          leaving?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onApply}
            className="rounded-lg bg-fs-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default UnsavedChangesModal