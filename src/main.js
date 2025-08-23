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
  { path: '/tools/qr-tools', component: QRTools },
  { path: '/tools/merge-pdf', component: PDFMerge },
  { path: '/tools/split-pdf', component: PDFSplit },
  { path: '/tools/pdf-to-image', component: PDFToImage },
  { path: '/tools/compress-image', component: ImageCompress },
  { path: '/tools/resize-image', component: ImageResize }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')