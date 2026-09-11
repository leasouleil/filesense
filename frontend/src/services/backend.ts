import { Command, Child } from '@tauri-apps/plugin-shell'

let backendProcess: Child | null = null

export async function startBackend(): Promise<void> {
  console.log('[FileSense] Starting backend sidecar...')

  if (backendProcess) {
    console.log('[FileSense] Backend already running.')
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