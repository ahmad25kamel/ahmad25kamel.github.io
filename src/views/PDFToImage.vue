<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="PDF to Image"
      subtitle="Convert PDF pages to PNG/JPG images"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">PDF to Image Converter</h2>
        
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📄➡️🖼️</div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">PDF to Image Tool</h3>
          <p class="text-gray-600 mb-6">This tool will be fully implemented in the Vue.js version.</p>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 class="font-medium text-blue-800 mb-2">Features Coming Soon:</h4>
            <ul class="text-sm text-blue-700 text-left space-y-1">
              <li>• Convert PDF pages to PNG/JPG</li>
              <li>• Download individual pages or ZIP</li>
              <li>• Quality selection</li>
              <li>• Batch processing</li>
              <li>• 100% client-side processing</li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'PDFToImage',
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    document.title = 'PDF to Image - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert PDF pages to PNG/JPG images. Download individually or as ZIP. 100% client-side processing.')
    }
  }
}
</script>