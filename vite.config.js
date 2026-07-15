import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import babel from '@rolldown/plugin-babel'
import path from 'path' // 加这个
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // proxy: {
    //   // 以 /api 开头的请求，都会代理到本地服务端
    //   '/res': {
    //     target: 'http://127.0.0.1:7001', // 你的后端地址
    //     changeOrigin: true,
    //   },
    //   '/api': {
    //     target: 'http://127.0.0.1:7001', // 你的后端地址
    //     changeOrigin: true,
    //   },
    //   '/static': {
    //     target: 'http://127.0.0.1:7001', // 你的后端地址
    //     changeOrigin: true,
    //   },
    // }
    proxy: {
      // 以 /api 开头的请求，都会代理到本地服务端

      '/api': {
        target: 'http://192.168.1.3:8100', // 你的后端地址
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://192.168.1.3:8100', // 你的后端地址
        changeOrigin: true,
      },
    }
  }
})
