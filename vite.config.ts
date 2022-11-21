import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jotaiDebuglabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [jotaiDebuglabel, jotaiReactRefresh]
    }
  })]
})
