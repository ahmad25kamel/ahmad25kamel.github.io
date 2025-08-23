<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="gradient-bg text-white py-6 lg:py-8">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">Private Online Tools</h1>
          <p class="text-xl md:text-2xl font-light">All tools run 100% in your browser. No files are ever uploaded. Fast, private, and free.</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 lg:py-12">
      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
        <!-- PDF Tools -->
        <ToolCard
          icon="📄"
          title="PDF to Image"
          description="Convert PDF pages to PNG/JPG images. Download individually or as ZIP."
          tool-path="/tools/pdf-to-image"
          color-scheme="blue"
        />
        
        <ToolCard
          icon="📑"
          title="Merge PDF"
          description="Combine multiple PDF files into a single document."
          tool-path="/tools/merge-pdf"
          color-scheme="green"
        />
        
        <ToolCard
          icon="✂️"
          title="Split PDF"
          description="Extract specific pages or split PDF into multiple documents."
          tool-path="/tools/split-pdf"
          color-scheme="purple"
        />

        <!-- Image Tools -->
        <ToolCard
          icon="🖼️"
          title="Resize Image"
          description="Change image dimensions by pixels or percentage with preview."
          tool-path="/tools/resize-image"
          color-scheme="yellow"
        />
        
        <ToolCard
          icon="🗜️"
          title="Compress Image"
          description="Reduce image file size with quality slider and before/after preview."
          tool-path="/tools/compress-image"
          color-scheme="red"
        />

        <!-- Privacy & Advanced Tools -->
        <ToolCard
          icon="📱"
          title="QR Code Tools"
          description="Generate QR codes from text or decode QR codes from images."
          tool-path="/tools/qr-tools"
          color-scheme="indigo"
        />
      </div>

      <!-- Features Section -->
      <div class="bg-white rounded-xl shadow-xl p-6 lg:p-8 mb-12 lg:mb-16 border border-gray-100">
        <h2 class="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6 lg:mb-8">Why Choose Our Tools?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          <div class="text-center p-4">
            <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">100% Private</h3>
            <p class="text-gray-600 text-sm leading-relaxed">All processing happens in your browser. No files are ever uploaded to our servers.</p>
          </div>
          
          <div class="text-center p-4">
            <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Lightning Fast</h3>
            <p class="text-gray-600 text-sm leading-relaxed">No upload/download delays. Process files instantly using modern web technologies.</p>
          </div>
          
          <div class="text-center p-4">
            <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Always Free</h3>
            <p class="text-gray-600 text-sm leading-relaxed">No subscriptions, no limits. All tools are completely free to use forever.</p>
          </div>
          
          <div class="text-center p-4">
            <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">No Ads</h3>
            <p class="text-gray-600 text-sm leading-relaxed">Clean, distraction-free interface. Focus on your work without interruptions.</p>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 class="text-lg font-bold text-gray-800 mb-3">📄 PDF Tools</h3>
          <p class="text-gray-600 text-sm">Convert, merge, split, and manipulate PDF files</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 class="text-lg font-bold text-gray-800 mb-3">🖼️ Image Tools</h3>
          <p class="text-gray-600 text-sm">Resize, compress, and optimize images</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 class="text-lg font-bold text-gray-800 mb-3">📊 Office & Data</h3>
          <p class="text-gray-600 text-sm">Document processing and data conversion</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 class="text-lg font-bold text-gray-800 mb-3">🔐 Privacy & Advanced</h3>
          <p class="text-gray-600 text-sm">QR codes and security-focused tools</p>
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
import ToolCard from '../components/ToolCard.vue'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
    ToolCard
  },
  data() {
    return {
      currentLanguage: 'en'
    }
  },
  methods: {
    handleLanguageChange(languageCode) {
      this.currentLanguage = languageCode
      // Here you would implement language switching logic
      console.log('Language changed to:', languageCode)
    }
  },
  mounted() {
    // SEO optimizations
    document.title = 'Private Online Tools - 100% Client-Side Privacy Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Collection of privacy-first online tools that run 100% in your browser. PDF tools, image processing, QR codes - all client-side, no uploads, fast and free.')
    }
  }
}
</script>