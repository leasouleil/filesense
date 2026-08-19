import AppLayout from './layouts/AppLayout'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  )
}

export default App