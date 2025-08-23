<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="Merge PDF"
      subtitle="Combine multiple PDF files into one"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">PDF Merger</h2>
        
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📑+📑=📄</div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Merge PDF Tool</h3>
          <p class="text-gray-600 mb-6">This tool will be fully implemented in the Vue.js version.</p>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 class="font-medium text-green-800 mb-2">Features Coming Soon:</h4>
            <ul class="text-sm text-green-700 text-left space-y-1">
              <li>• Combine multiple PDF files</li>
              <li>• Drag & drop file ordering</li>
              <li>• Preview before merging</li>
              <li>• Custom page ranges</li>
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
  name: 'PDFMerge',
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    document.title = 'Merge PDF - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Combine multiple PDF files into a single document. 100% client-side processing.')
    }
  }
}
</script>