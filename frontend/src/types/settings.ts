export interface SettingsForm {
  watch_folder: string
  sorted_folder: string
  log_level: string
  ai_backend: string
  local_model: string
  cloud_provider: string
  categories: Record<string, string>
  start_on_boot: boolean
  automatic_sorting: boolean
  theme: 'light' | 'dark' | 'system'
}