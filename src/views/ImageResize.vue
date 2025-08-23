<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="Resize Image"
      subtitle="Change image dimensions with preview"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Image Resizer</h2>
        
        <div class="text-center py-12">
          <div class="text-6xl mb-4">🖼️📏🖼️</div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Resize Image Tool</h3>
          <p class="text-gray-600 mb-6">This tool will be fully implemented in the Vue.js version.</p>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 class="font-medium text-yellow-800 mb-2">Features Coming Soon:</h4>
            <ul class="text-sm text-yellow-700 text-left space-y-1">
              <li>• Resize by pixels or percentage</li>
              <li>• Maintain aspect ratio</li>
              <li>• Real-time preview</li>
              <li>• Multiple format output</li>
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
  name: 'ImageResize',
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    document.title = 'Resize Image - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Change image dimensions by pixels or percentage with preview. 100% client-side processing.')
    }
  }
}
</script>