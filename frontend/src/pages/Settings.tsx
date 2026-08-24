import { useState } from 'react'

interface SettingsForm {
  watch_folder: string
  sorted_folder: string
  log_level: string
  ai_backend: string
  local_model: string
  cloud_provider: string
  categories: Record<string, string>
}

const initialSettings: SettingsForm = {
  watch_folder: 'Downloads_Test',
  sorted_folder: 'Sorted',
  log_level: 'INFO',
  ai_backend: 'local',
  local_model: 'llama3.2',
  cloud_provider: '',
  categories: {
    Finance: 'Finance',
    School: 'School',
    Programming: 'Programming',
    Personal: 'Personal',
    Forms: 'Forms',
    Installer: 'Installer',
  },
}

function Settings() {
  const [settings, setSettings] =
    useState<SettingsForm>(initialSettings)

  const [newCategory, setNewCategory] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [categoryError, setCategoryError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  const updateSetting = <K extends keyof SettingsForm>(
    key: K,
    value: SettingsForm[K],
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleAddCategory = () => {
    const categoryName = newCategory.trim()

    if (!categoryName) {
      setCategoryError('Please enter a category name.')
      return
    }

    const categoryExists = Object.keys(settings.categories).some(
      (category) =>
        category.toLowerCase() === categoryName.toLowerCase(),
    )

    if (categoryExists) {
      setCategoryError(
        'Category already exists. Select a different name.',
      )
      return
    }

    setSettings((current) => ({
      ...current,
      categories: {
        ...current.categories,
        [categoryName]: categoryName,
      },
    }))

    setNewCategory('')
    setCategoryError('')
    setShowAddCategory(false)
  }

  const handleRemoveCategory = (category: string) => {
    setSettings((current) => {
      const updatedCategories = { ...current.categories }

      delete updatedCategories[category]

      return {
        ...current,
        categories: updatedCategories,
      }
    })
  }

  const handleSave = () => {
  console.log('Settings to save:', settings)

  setSaveMessage('Settings saved successfully.')

  setTimeout(() => {
    setSaveMessage('')
  }, 3000)
}

  return (
    <div className="mx-auto max-w-4xl pb-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Settings
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Configure FileSense.
        </p>
      </header>

      {/* General */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-fs-text-primary">
          General
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
          {/* Watch Folder */}
          <div className="p-5">
            <label className="text-sm font-medium text-fs-text-primary">
              Watched Folder
            </label>

            <p className="mt-1 text-xs text-fs-text-muted">
              Folder monitored for new files.
            </p>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={settings.watch_folder}
                onChange={(event) =>
                  updateSetting(
                    'watch_folder',
                    event.target.value,
                  )
                }
                className="min-w-0 flex-1 rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
              />

              <button
                type="button"
                className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
              >
                Browse
              </button>
            </div>
          </div>

          {/* Sorted Folder */}
          <div className="border-t border-fs-border p-5">
            <label className="text-sm font-medium text-fs-text-primary">
              Sorted Folder
            </label>

            <p className="mt-1 text-xs text-fs-text-muted">
              Destination for organized files.
            </p>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={settings.sorted_folder}
                onChange={(event) =>
                  updateSetting(
                    'sorted_folder',
                    event.target.value,
                  )
                }
                className="min-w-0 flex-1 rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
              />

              <button
                type="button"
                className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Classification */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-fs-text-primary">
          AI Classification
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
          {/* Backend */}
          <div className="p-5">
            <label className="text-sm font-medium text-fs-text-primary">
              AI Backend
            </label>

            <p className="mt-1 text-xs text-fs-text-muted">
              Choose how files are classified.
            </p>

            <div className="mt-4 space-y-3">
              {/* Local */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="radio"
                  name="ai-backend"
                  value="local"
                  checked={settings.ai_backend === 'local'}
                  onChange={() =>
                    updateSetting('ai_backend', 'local')
                  }
                  className="mt-1"
                />

                <div>
                  <p className="text-sm text-fs-text-primary">
                    Local AI
                  </p>

                  <p className="text-xs text-fs-text-muted">
                    Uses Ollama locally.
                  </p>
                </div>
              </label>

              {/* Cloud */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="radio"
                  name="ai-backend"
                  value="cloud"
                  checked={settings.ai_backend === 'cloud'}
                  onChange={() =>
                    updateSetting('ai_backend', 'cloud')
                  }
                  className="mt-1"
                />

                <div>
                  <p className="text-sm text-fs-text-primary">
                    Cloud AI
                  </p>

                  <p className="text-xs text-fs-text-muted">
                    Uses a cloud provider.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Local Model */}
          {settings.ai_backend === 'local' && (
            <div className="border-t border-fs-border p-5">
              <label className="text-sm font-medium text-fs-text-primary">
                Local Model
              </label>

              <p className="mt-1 text-xs text-fs-text-muted">
                Ollama model used for classification.
              </p>

              <input
                type="text"
                value={settings.local_model}
                onChange={(event) =>
                  updateSetting(
                    'local_model',
                    event.target.value,
                  )
                }
                className="mt-3 w-full rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
              />
            </div>
          )}

          {/* Cloud Provider */}
          {settings.ai_backend === 'cloud' && (
            <div className="border-t border-fs-border p-5">
              <label className="text-sm font-medium text-fs-text-primary">
                Cloud Provider
              </label>

              <p className="mt-1 text-xs text-fs-text-muted">
                Provider used for classification.
              </p>

              <input
                type="text"
                value={settings.cloud_provider}
                onChange={(event) =>
                  updateSetting(
                    'cloud_provider',
                    event.target.value,
                  )
                }
                placeholder="Enter provider"
                className="mt-3 w-full rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
              />
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-sm font-semibold text-fs-text-primary">
              Categories
            </h2>

            <p className="mt-1 text-xs text-fs-text-muted">
              Folders used for organization.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowAddCategory(true)
              setCategoryError('')
            }}
            className="text-xs font-medium text-fs-accent hover:opacity-80"
          >
            + Add Category
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
          {/* Existing Categories */}
          {Object.entries(settings.categories).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-4 border-b border-fs-border px-5 py-4 last:border-b-0"
              >
                <div className="w-40 shrink-0 text-sm text-fs-text-primary">
                  {key}
                </div>

                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      categories: {
                        ...current.categories,
                        [key]: event.target.value,
                      },
                    }))
                  }
                  className="min-w-0 flex-1 rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveCategory(key)}
                  className="shrink-0 rounded-md px-2 py-1 text-xs text-fs-text-muted transition hover:bg-fs-background hover:text-red-400"
                  aria-label={`Remove ${key} category`}
                >
                  Remove
                </button>
              </div>
            ),
          )}

          {Object.keys(settings.categories).length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-fs-text-muted">
                No categories added.
              </p>
            </div>
          )}

          {/* Add Category Form */}
          {showAddCategory && (
            <div className="border-t border-fs-border bg-fs-background/40 p-5">
              <label className="text-sm font-medium text-fs-text-primary">
                New Category
              </label>

              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(event) => {
                    setNewCategory(event.target.value)
                    setCategoryError('')
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleAddCategory()
                    }
                  }}
                  autoFocus
                  placeholder="e.g. Work"
                  className={`min-w-0 flex-1 rounded-lg border bg-fs-surface px-3 py-2 text-sm text-fs-text-primary outline-none ${
                    categoryError
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-fs-border focus:border-fs-accent'
                  }`}
                />

                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="rounded-lg bg-fs-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNewCategory('')
                    setCategoryError('')
                    setShowAddCategory(false)
                  }}
                  className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary"
                >
                  Cancel
                </button>
              </div>

              {/* Duplicate / Validation Warning */}
              {categoryError && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                  <span aria-hidden="true">⚠</span>
                  {categoryError}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Save */}
      <div className="mt-8 flex justify-end gap-4">
          {saveMessage && (
            <p className="text-xs text-fs-text-secondary">
              {saveMessage}
              </p>
          )}

        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-fs-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Settings