import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

export default defineConfig(() => {
  // PROGRAMMATIC PWA ICON GENERATION ON VITE COMPILE
  try {
    const publicDir = path.resolve(__dirname, 'public');
    const iconsDir = path.resolve(publicDir, 'icons');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Standard valid solid purple square base64 buffer as placeholder
    const purpleIconBase64 = "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAAb3vaAFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHLSURBVHhe7dEBDQAAAMKg909tDjcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwZ7gAAZsz7N0AAAAASUVORK5CYII=";

    const iconPath192 = path.resolve(publicDir, 'pwa-192x192.png');
    const iconPath512 = path.resolve(publicDir, 'pwa-512x512.png');
    const newIconPath192 = path.resolve(iconsDir, 'icon-192.png');
    const newIconPath512 = path.resolve(iconsDir, 'icon-512.png');

    if (!fs.existsSync(iconPath192)) {
      fs.writeFileSync(iconPath192, Buffer.from(purpleIconBase64, 'base64'));
    }
    if (!fs.existsSync(iconPath512)) {
      fs.writeFileSync(iconPath512, Buffer.from(purpleIconBase64, 'base64'));
    }
    if (!fs.existsSync(newIconPath192)) {
      fs.writeFileSync(newIconPath192, Buffer.from(purpleIconBase64, 'base64'));
    }
    if (!fs.existsSync(newIconPath512)) {
      fs.writeFileSync(newIconPath512, Buffer.from(purpleIconBase64, 'base64'));
    }
    
    // Also write a simple favicon.ico to keep the browser happy
    const faviconPath = path.resolve(publicDir, 'favicon.ico');
    if (!fs.existsSync(faviconPath)) {
      fs.writeFileSync(faviconPath, Buffer.from(purpleIconBase64, 'base64'));
    }
  } catch (error) {
    console.error("Programmatic PWA Icon step had an issue:", error);
  }

  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
        },
        manifest: {
          name: 'i-Qalb Care',
          short_name: 'i-Qalb Care',
          description: 'Wellness Intervensi Emosi Kanak-Kanak & Kaunselor Sekolah',
          theme_color: '#8B5CF6',
          background_color: '#FFF7ED',
          display: 'standalone',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
