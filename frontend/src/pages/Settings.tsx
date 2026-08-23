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

  const updateSetting = <K extends keyof SettingsForm>(
    key: K,
    value: SettingsForm[K],
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSave = () => {
    console.log('Settings to save:', settings)
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Settings
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Configure how FileSense organizes your files.
        </p>
      </header>

      {/* General */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-fs-text-primary">
          General
        </h2>

        <div className="mt-4 rounded-xl border border-fs-border bg-fs-surface">
          <div className="p-5">
            <label className="text-sm font-medium text-fs-text-primary">
              Watched Folder
            </label>

            <p className="mt-1 text-xs text-fs-text-secondary">
              Folder that FileSense monitors for new files.
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
                className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary hover:bg-fs-background"
              >
                Browse
              </button>
            </div>
          </div>

          <div className="border-t border-fs-border p-5">
            <label className="text-sm font-medium text-fs-text-primary">
              Sorted Folder
            </label>

            <p className="mt-1 text-xs text-fs-text-secondary">
              Folder where organized files will be placed.
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
                className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary hover:bg-fs-background"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-fs-text-primary">
          AI Classification
        </h2>

        <div className="mt-4 rounded-xl border border-fs-border bg-fs-surface">
          <div className="p-5">
            <label className="text-sm font-medium text-fs-text-primary">
              AI Backend
            </label>

            <p className="mt-1 text-xs text-fs-text-secondary">
              Choose how FileSense classifies files.
            </p>

            <div className="mt-4 space-y-3">
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

                  <p className="text-xs text-fs-text-secondary">
                    Uses the local Ollama model configured for FileSense.
                  </p>
                </div>
              </label>

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

                  <p className="text-xs text-fs-text-secondary">
                    Uses a configured cloud AI provider.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {settings.ai_backend === 'local' && (
            <div className="border-t border-fs-border p-5">
              <label className="text-sm font-medium text-fs-text-primary">
                Local Model
              </label>

              <p className="mt-1 text-xs text-fs-text-secondary">
                Ollama model used for file classification.
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

          {settings.ai_backend === 'cloud' && (
            <div className="border-t border-fs-border p-5">
              <label className="text-sm font-medium text-fs-text-primary">
                Cloud Provider
              </label>

              <p className="mt-1 text-xs text-fs-text-secondary">
                Provider used for AI classification.
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
        <h2 className="text-sm font-semibold text-fs-text-primary">
          Categories
        </h2>

        <p className="mt-1 text-xs text-fs-text-secondary">
          Folders used when organizing files.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
          {Object.entries(settings.categories).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-4 border-b border-fs-border px-5 py-4 last:border-b-0"
              >
                <div className="w-40 text-sm text-fs-text-primary">
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
              </div>
            ),
          )}
        </div>
      </section>

      {/* Save */}
      <div className="mt-8 flex justify-end">
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