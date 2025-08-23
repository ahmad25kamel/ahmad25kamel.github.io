<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="Compress Image"
      subtitle="Reduce image file size with quality control"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Image Compressor</h2>
        
        <div class="text-center py-12">
          <div class="text-6xl mb-4">🖼️🗜️📦</div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Compress Image Tool</h3>
          <p class="text-gray-600 mb-6">This tool will be fully implemented in the Vue.js version.</p>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 class="font-medium text-red-800 mb-2">Features Coming Soon:</h4>
            <ul class="text-sm text-red-700 text-left space-y-1">
              <li>• Reduce file size with quality slider</li>
              <li>• Before/after preview</li>
              <li>• Multiple format support</li>
              <li>• Batch compression</li>
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
  name: 'ImageCompress',
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    document.title = 'Compress Image - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reduce image file size with quality slider and before/after preview. 100% client-side processing.')
    }
  }
}
</script>