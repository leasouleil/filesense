import { Command, Child } from '@tauri-apps/plugin-shell'

const API_BASE_URL = 'http://127.0.0.1:8000'

let backendProcess: Child | null = null

async function waitForBackend(
  timeoutMs = 10000,
  intervalMs = 250,
): Promise<void> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`)

      if (response.ok) {
        console.log('[FileSense] Backend is ready.')
        return
      }
    } catch {
      // Backend is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }

  throw new Error('FileSense backend did not become ready in time.')
}

export async function startBackend(): Promise<void> {
  console.log('[FileSense] Starting backend sidecar...')

  if (backendProcess) {
    console.log('[FileSense] Backend already running.')
    await waitForBackend()
    return
  }

  try {
    const command = Command.sidecar('binaries/filesense-backend')

    command.stdout.on('data', (line) => {
      console.log('[FileSense backend]', line)
    })

    command.stderr.on('data', (line) => {
      console.error('[FileSense backend]', line)
    })

    command.on('close', (data) => {
      console.log('[FileSense backend] exited:', data)
      backendProcess = null
    })

    backendProcess = await command.spawn()

    console.log('[FileSense] Backend sidecar started.')

    await waitForBackend()
  } catch (error) {
    console.error('[FileSense] Failed to start backend sidecar:', error)
    throw error
  }
}

export async function stopBackend(): Promise<void> {
  if (!backendProcess) {
    return
  }

  await backendProcess.kill()
  backendProcess = null
}