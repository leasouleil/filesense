import type { SettingsForm } from '../types/settings'
import { apiRequest } from './api'

export async function getSettings(): Promise<SettingsForm> {
  return apiRequest<SettingsForm>('/api/config')
}

export async function saveSettings(
  settings: SettingsForm,
): Promise<SettingsForm> {
  const response = await apiRequest<{
    success: boolean
    config: SettingsForm
  }>('/api/config', {
    method: 'PUT',
    body: JSON.stringify(settings),
  })

  return response.config
}