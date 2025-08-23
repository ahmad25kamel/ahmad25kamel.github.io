import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import QRTools from './views/QRTools.vue'
import PDFMerge from './views/PDFMerge.vue'
import PDFSplit from './views/PDFSplit.vue'
import PDFToImage from './views/PDFToImage.vue'
import ImageCompress from './views/ImageCompress.vue'
import ImageResize from './views/ImageResize.vue'

// Import global styles
import './styles/main.css'

const routes = [
  { path: '/', component: Home },
  { path: '/tools/qr-tools.html', component: QRTools },
  { path: '/tools/merge-pdf.html', component: PDFMerge },
  { path: '/tools/split-pdf.html', component: PDFSplit },
  { path: '/tools/pdf-to-image.html', component: PDFToImage },
  { path: '/tools/compress-image.html', component: ImageCompress },
  { path: '/tools/resize-image.html', component: ImageResize }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// Add navigation guards for better routing integration
router.beforeEach((to, from, next) => {
  // Set SPA preference when navigating within the SPA
  localStorage.setItem('prefer-spa', 'true')
  
  // Handle any routing analytics or state management here
  next()
})

router.afterEach((to, from) => {
  // Update document title based on route
  const titleMap = {
    '/': 'Private Online Tools - 100% Client-Side Privacy Tools',
    '/tools/qr-tools.html': 'QR Code Tools - Private Online Tools',
    '/tools/merge-pdf.html': 'Merge PDF - Private Online Tools',
    '/tools/split-pdf.html': 'Split PDF - Private Online Tools', 
    '/tools/pdf-to-image.html': 'PDF to Image - Private Online Tools',
    '/tools/compress-image.html': 'Compress Image - Private Online Tools',
    '/tools/resize-image.html': 'Resize Image - Private Online Tools'
  }
  
  document.title = titleMap[to.path] || 'Private Online Tools'
})

const app = createApp(App)
app.use(router)
app.mount('#app')