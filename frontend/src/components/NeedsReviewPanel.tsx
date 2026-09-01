import { X } from 'lucide-react'

interface ReviewFile {
  id: number
  fileName: string
  recommendedFolder: string
}

interface NeedsReviewPanelProps {
  open: boolean
  onClose: () => void
}

const reviewFiles: ReviewFile[] = [
  {
    id: 1,
    fileName: 'invoice_example.pdf',
    recommendedFolder: 'Finance',
  },
  {
    id: 2,
    fileName: 'project_notes.docx',
    recommendedFolder: 'School',
  },
  {
    id: 3,
    fileName: 'unknown_file.xlsx',
    recommendedFolder: 'Finance',
  },
]

function NeedsReviewPanel({
  open,
  onClose,
}: NeedsReviewPanelProps) {
  if (!open) {
    return null
  }

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Panel */}
      <aside className="fixed right-0 top-0 z-50 flex h-screen w-96 flex-col border-l border-fs-border bg-fs-surface shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-fs-border px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-fs-text-primary">
              Needs Review
            </h2>

            <p className="mt-1 text-xs text-fs-text-muted">
              Files that need your attention.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-fs-text-muted transition hover:bg-fs-background hover:text-fs-text-primary"
            aria-label="Close review panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Files */}
        <div className="flex-1 overflow-y-auto">
          {reviewFiles.length > 0 ? (
            <div className="divide-y divide-fs-border">
              {reviewFiles.map((file) => (
                <div
                  key={file.id}
                  className="px-6 py-5"
                >
                  <p className="truncate text-sm font-medium text-fs-text-primary">
                    {file.fileName}
                  </p>

                  <p className="mt-3 text-xs text-fs-text-muted">
                    Recommended action
                  </p>

                  <p className="mt-1 text-sm text-fs-text-secondary">
                    Move to{' '}
                    <span className="font-medium text-fs-accent">
                      {file.recommendedFolder}
                    </span>
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-fs-accent px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-fs-border px-3 py-2 text-xs text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
                    >
                      Choose Folder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-fs-text-secondary">
                Nothing needs review.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default NeedsReviewPanel