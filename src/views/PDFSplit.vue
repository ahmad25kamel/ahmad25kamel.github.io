<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="Split PDF"
      subtitle="Extract pages or split PDF into multiple files"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">PDF Splitter</h2>
        
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📄✂️📄📄</div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Split PDF Tool</h3>
          <p class="text-gray-600 mb-6">This tool will be fully implemented in the Vue.js version.</p>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 class="font-medium text-purple-800 mb-2">Features Coming Soon:</h4>
            <ul class="text-sm text-purple-700 text-left space-y-1">
              <li>• Extract specific pages</li>
              <li>• Split by page ranges</li>
              <li>• Split into equal parts</li>
              <li>• Preview before splitting</li>
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
  name: 'PDFSplit',
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    document.title = 'Split PDF - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Extract specific pages or split PDF into multiple documents. 100% client-side processing.')
    }
  }
}
</script>