import type { SettingsForm } from '../types/settings'

export const defaultSettings: SettingsForm = {
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
  start_on_boot: false,
  automatic_sorting: true,
  theme: 'system',
}