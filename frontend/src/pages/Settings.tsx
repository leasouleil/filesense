import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import SettingsSection from '../components/settings/SettingsSection'
import SettingsRow from '../components/settings/SettingsRow'
import FolderInput from '../components/settings/FolderInput'
import CategoryRow from '../components/settings/CategoryRow'
import type { SettingsForm } from '../types/settings'

interface SettingsProps {
  settings: SettingsForm
  onSettingsChange: Dispatch<SetStateAction<SettingsForm>>
}


function Settings({
  settings: savedSettings,
  onSettingsChange,
}: SettingsProps) { 
  const [settings, setSettings] = useState<SettingsForm>(savedSettings)

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
      const updatedCategories = { ...current.categories}

      delete updatedCategories[category]

      return {
        ...current,
        categories: updatedCategories
       }   
    })
  }

  const handleSave = () => {
    onSettingsChange(settings)

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
      <SettingsSection
        title="General"
        description="Configure where FileSense monitors and organizes your files."
      >
        <FolderInput
          label="Watched Folder"
          description="Folder monitored for new files."
          value={settings.watch_folder}
          onChange={(value) =>
            updateSetting('watch_folder', value)
          }
        />

        <FolderInput
          label="Sorted Folder"
          description="Destination for organized files."
          value={settings.sorted_folder}
          onChange={(value) =>
            updateSetting('sorted_folder', value)
          }
        />
      </SettingsSection>

    {/* AI Classification */}
    <SettingsSection
        title="AI Classification"
        description="Choose how FileSense classifies your files."
      >
      {/* AI Backend */}
      <SettingsRow
        label="AI Backend"
        description="Choose how files are classified."
      >
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-fs-text-primary">
            <input
                type="radio"
                name="ai-backend"
                value="local"
                checked={settings.ai_backend === 'local'}
                onChange={() =>
                  updateSetting('ai_backend', 'local')
                }
              />
              Local
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-fs-text-primary">
            <input
                type="radio"
                name="ai-backend"
                value="cloud"
                checked={settings.ai_backend === 'cloud'}
                onChange={() =>
                  updateSetting('ai_backend', 'cloud')
                }
              />
              Cloud
          </label>
        </div>
      </SettingsRow>

      {/* Local Model */}
      <SettingsRow
        label="Local Model"
        description="Ollama model used for classification."
      >
        <input
          type="text"
          value={settings.local_model}
          onChange={(event) =>
            updateSetting(
              'local_model',
              event.target.value,
            )
          }
          disabled={settings.ai_backend !== 'local'}
          className={`w-64 rounded-lg border px-3 py-2 text-sm outline-none transition ${
            settings.ai_backend === 'local'
              ? 'border-fs-border bg-fs-background text-fs-text-primary focus:border-fs-accent'
              : 'cursor-not-allowed border-fs-border bg-fs-background/50 text-fs-text-muted opacity-50'
            }`}
        />
      </SettingsRow>

      {/* Cloud Provider */}
      <SettingsRow
        label="Cloud Provider"
        description="Provider used for classification."
      >
        <input
          type="text"
          value={settings.cloud_provider}
          onChange={(event) =>
            updateSetting(
              'cloud_provider',
              event.target.value,
             )
          }
          disabled={settings.ai_backend !== 'cloud'}
          placeholder="Enter provider"
          className={`w-64 rounded-lg border px-3 py-2 text-sm outline-none transition ${
            settings.ai_backend === 'cloud'
              ? 'border-fs-border bg-fs-background text-fs-text-primary focus:border-fs-accent'
              : 'cursor-not-allowed border-fs-border bg-fs-background/50 text-fs-text-muted opacity-50'
          }`}
        />
      </SettingsRow>
    </SettingsSection>

      {/* Categories */}
      <SettingsSection
        title="Categories"
        description="Folders used for organization."
      >
        {/* Existing Categories */}
        <div className="subtle-scrollbar max-h-80 overflow-y-auto">
          {Object.entries(settings.categories).map(
            ([key, value]) => (
              <CategoryRow
                key={key}
                name={key}
                value={value}
                onChange={(newValue) =>
                  setSettings((current) => ({
                    ...current,
                    categories: {
                    ...current.categories,
                    [key]: newValue,
                    },
                  }))
                }
                onRemove={() => handleRemoveCategory(key)}
              />
            ),
          )}

        {/* Empty State */}
          {Object.keys(settings.categories).length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-fs-text-muted">
                No categories added.
              </p>
            </div>
          )}
        </div>

        {/* Add Category */}
          {showAddCategory ? (
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
                  className="rounded-lg bg-fs-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
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
                  className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
                >
                  Cancel
                </button>
              </div>

          {/* Validation Warning */}
            {categoryError && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                  <span aria-hidden="true">⚠</span>
                  {categoryError}
                </p>
              )}
            </div>
          ) : (
            <div className="border-t border-fs-border px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddCategory(true)
                  setCategoryError('')
                }}
                className="text-xs font-medium text-fs-accent transition hover:opacity-80"
              >
                + Add Category
              </button>
            </div>
          )}
        </SettingsSection>

        {/* System */}
        <SettingsSection
          title="System"
          description="Control how FileSense behaves on your computer."
        >
          {/* Start on Boot */}
          <SettingsRow
            label="Start on Boot"
            description="Launch FileSense automatically when your PC starts."
          >
            <button
              type="button"
              role="switch"
              aria-checked={settings.start_on_boot}
              onClick={() =>
                updateSetting(
                  'start_on_boot',
                  !settings.start_on_boot,
                )
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.start_on_boot
                  ? 'bg-fs-accent'
                  : 'bg-fs-border'
              }`}
            >
              <span
                className={`absolute left-0 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  settings.start_on_boot
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingsRow>

          {/* Automatic Sorting */}
          <SettingsRow
            label="Automatic Sorting"
            description="Automatically organize new files into their configured categories."
          >
            <button
              type="button"
              role="switch"
              aria-checked={settings.automatic_sorting}
              onClick={() =>
                updateSetting(
                  'automatic_sorting',
                  !settings.automatic_sorting,
                )
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.automatic_sorting
                  ? 'bg-fs-accent'
                  : 'bg-fs-border'
              }`}
            >
              <span
                className={`absolute left-0 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  settings.automatic_sorting
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </SettingsRow>

          {/* Theme */}
          <SettingsRow
            label="Theme"
            description="Choose how FileSense looks."
          >
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-fs-text-primary">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={() =>
                    updateSetting('theme', 'light')
                  }
                />
                Light
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-fs-text-primary">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={() =>
                    updateSetting('theme', 'dark')
                  }
                />
                Dark
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-fs-text-primary">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={settings.theme === 'system'}
                  onChange={() =>
                    updateSetting('theme', 'system')
                  }
                />
                System
              </label>
            </div>
          </SettingsRow>
        </SettingsSection>

          {/* Save */}
          <div className="mt-8 flex items-center justify-end gap-4">
            {saveMessage && (
              <p className="text-xs text-fs-text-secondary">
                {saveMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-fs-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      )
    }

export default Settings