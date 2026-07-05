// vite.config.js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url" 
import path from "node:path"        
import tailwindcss from "@tailwindcss/vite"   

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})