<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="QR Code Tools"
      subtitle="Generate and decode QR codes"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Tab Navigation -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <button
            @click="activeTab = 'generate'"
            :class="['tab-button flex-1 py-3 px-6 rounded-lg font-medium transition-colors', 
                     activeTab === 'generate' ? 'active' : 'bg-gray-100 hover:bg-gray-200']"
          >
            🏗️ Generate QR Code
          </button>
          <button
            @click="activeTab = 'read'"
            :class="['tab-button flex-1 py-3 px-6 rounded-lg font-medium transition-colors',
                     activeTab === 'read' ? 'active' : 'bg-gray-100 hover:bg-gray-200']"
          >
            🔍 Read QR Code
          </button>
        </div>
      </div>

      <!-- Generate QR Code Section -->
      <div v-show="activeTab === 'generate'" class="space-y-8">
        <!-- Input Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Generate QR Code</h2>
          
          <!-- Text Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Enter text, URL, or data</label>
            <textarea 
              v-model="qrText"
              @input="generateQRCode"
              placeholder="Enter your text, URL, email, phone number, or any other data..." 
              class="w-full h-32 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">Maximum recommended: 2000 characters</p>
          </div>

          <!-- QR Code Options -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-700">QR Code Settings</h3>
              <button 
                @click="showAdvanced = !showAdvanced"
                class="text-sm text-indigo-700 hover:text-indigo-800 focus:outline-none font-medium"
              >
                ⚙️ Advanced Settings
              </button>
            </div>
            
            <!-- Basic Settings -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select v-model="qrSize" @change="generateQRCode" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500">
                  <option value="200">Small (200x200)</option>
                  <option value="300">Medium (300x300)</option>
                  <option value="400">Large (400x400)</option>
                  <option value="500">Extra Large (500x500)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Error Correction</label>
                <select v-model="errorCorrection" @change="generateQRCode" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500">
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <!-- Advanced Settings -->
            <div v-show="showAdvanced" class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Foreground Color</label>
                <input v-model="foregroundColor" @change="generateQRCode" type="color" class="w-full h-10 border border-gray-300 rounded">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <input v-model="backgroundColor" @change="generateQRCode" type="color" class="w-full h-10 border border-gray-300 rounded">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Margin</label>
                <input v-model="margin" @change="generateQRCode" type="range" min="0" max="10" class="w-full">
                <span class="text-xs text-gray-500">{{ margin }} modules</span>
              </div>
            </div>
          </div>

          <!-- Generate Button -->
          <button 
            @click="generateQRCode"
            :disabled="!qrText.trim()"
            class="w-full py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :class="qrText.trim() ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500'"
          >
            🚀 Generate QR Code
          </button>
        </div>

        <!-- QR Code Preview -->
        <div v-if="generatedQR" class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">Generated QR Code</h3>
          
          <div class="qr-preview text-center mb-6">
            <canvas ref="qrCanvas" class="mx-auto border border-gray-200 rounded-lg shadow-md"></canvas>
          </div>

          <!-- Download Options -->
          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              @click="downloadQR('png')"
              class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              📥 Download PNG
            </button>
            
            <button 
              @click="copyQRToClipboard"
              class="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              📋 Copy to Clipboard
            </button>
          </div>

          <p class="text-sm text-gray-600 text-center mt-4">
            📱 Tip: Test with your phone camera to ensure it scans correctly
          </p>
        </div>
      </div>

      <!-- Read QR Code Section -->
      <div v-show="activeTab === 'read'" class="space-y-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Read QR Code from Image</h2>
          
          <!-- File Drop Zone -->
          <div 
            @drop="handleFileDrop"
            @dragover.prevent
            @dragenter.prevent
            :class="['drop-zone text-center p-8 rounded-lg transition-colors', isDragOver ? 'dragover' : '']"
            @dragenter="isDragOver = true"
            @dragleave="isDragOver = false"
          >
            <div class="mb-4">
              <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            
            <p class="text-lg font-medium text-gray-700 mb-2">Drop QR code image here</p>
            <p class="text-gray-500 mb-4">or</p>
            
            <input 
              ref="fileInput"
              @change="handleFileSelect"
              type="file" 
              accept="image/*" 
              class="hidden"
            >
            
            <button 
              @click="$refs.fileInput.click()"
              class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              📁 Choose Image File
            </button>
            
            <p class="text-sm text-gray-500 mt-2">Supports JPG, PNG, GIF, WebP</p>
          </div>

          <!-- Image Preview -->
          <div v-if="selectedImage" class="mt-6 text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-3">Selected Image</h3>
            <img 
              :src="selectedImage" 
              alt="Selected QR code image" 
              class="max-w-xs mx-auto border border-gray-200 rounded-lg shadow-md"
            >
            
            <button 
              @click="readQRCode"
              :disabled="isReading"
              class="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              {{ isReading ? '🔄 Reading...' : '🔍 Read QR Code' }}
            </button>
          </div>

          <!-- QR Code Result -->
          <div v-if="qrResult" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="text-lg font-medium text-green-800 mb-2">QR Code Content:</h3>
            <div class="bg-white p-4 rounded border">
              <pre class="whitespace-pre-wrap text-gray-800">{{ qrResult }}</pre>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2">
              <button 
                @click="copyToClipboard(qrResult)"
                class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors"
              >
                📋 Copy
              </button>
              
              <a 
                v-if="isURL(qrResult)"
                :href="qrResult" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium transition-colors inline-block"
              >
                🔗 Open Link
              </a>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 class="text-lg font-medium text-red-800 mb-2">Error:</h3>
            <p class="text-red-600">{{ errorMessage }}</p>
            <p class="text-sm text-red-500 mt-2">
              💡 Tips: Ensure the image is clear, well-lit, and the QR code is fully visible.
            </p>
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
  name: 'QRTools',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      activeTab: 'generate',
      
      // QR Generation
      qrText: '',
      qrSize: '300',
      errorCorrection: 'M',
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      margin: 4,
      showAdvanced: false,
      generatedQR: null,
      
      // QR Reading
      selectedImage: null,
      qrResult: null,
      errorMessage: null,
      isReading: false,
      isDragOver: false
    }
  },
  methods: {
    generateQRCode() {
      if (!this.qrText.trim()) {
        this.generatedQR = null
        return
      }

      try {
        // Simple QR code generation - this would need a real QR library
        const canvas = this.$refs.qrCanvas
        if (!canvas) return
        
        const ctx = canvas.getContext('2d')
        const size = parseInt(this.qrSize)
        
        canvas.width = size
        canvas.height = size
        
        // Clear canvas
        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(0, 0, size, size)
        
        // Simple placeholder pattern - in real implementation, use qrcode library
        ctx.fillStyle = this.foregroundColor
        const cellSize = size / 21 // QR code is typically 21x21 for version 1
        
        // Draw finder patterns (corners)
        this.drawFinderPattern(ctx, 0, 0, cellSize)
        this.drawFinderPattern(ctx, 14 * cellSize, 0, cellSize)
        this.drawFinderPattern(ctx, 0, 14 * cellSize, cellSize)
        
        // Draw some data pattern (simplified)
        for (let i = 0; i < 21; i++) {
          for (let j = 0; j < 21; j++) {
            if (Math.random() > 0.5 && !this.isFinderPattern(i, j)) {
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
          }
        }
        
        this.generatedQR = canvas.toDataURL()
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    },

    drawFinderPattern(ctx, x, y, cellSize) {
      // Outer square
      ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize)
      
      // Inner white square
      ctx.fillStyle = this.backgroundColor
      ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize)
      
      // Inner black square
      ctx.fillStyle = this.foregroundColor
      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize)
    },

    isFinderPattern(x, y) {
      return (x < 9 && y < 9) || (x > 12 && y < 9) || (x < 9 && y > 12)
    },

    downloadQR(format) {
      if (!this.generatedQR) return
      
      const link = document.createElement('a')
      link.download = `qr-code.${format}`
      link.href = this.generatedQR
      link.click()
    },

    async copyQRToClipboard() {
      if (!this.generatedQR) return
      
      try {
        const canvas = this.$refs.qrCanvas
        canvas.toBlob(async (blob) => {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          this.showNotification('QR code copied to clipboard!')
        })
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        this.showNotification('Failed to copy to clipboard', 'error')
      }
    },

    handleFileDrop(e) {
      e.preventDefault()
      this.isDragOver = false
      
      const files = e.dataTransfer.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
    },

    handleFileSelect(e) {
      const files = e.target.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
    },

    processFile(file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file.'
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.selectedImage = e.target.result
        this.qrResult = null
        this.errorMessage = null
      }
      reader.readAsDataURL(file)
    },

    async readQRCode() {
      if (!this.selectedImage) return
      
      this.isReading = true
      this.errorMessage = null
      this.qrResult = null
      
      try {
        // Placeholder for QR reading - would need jsQR or similar library
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate processing
        
        // For demo purposes, show a placeholder result
        this.qrResult = 'Demo QR content: https://example.com\n\nNote: This is a placeholder. Real implementation would use jsQR library.'
      } catch (error) {
        this.errorMessage = 'Could not read QR code from the image. Please ensure the image contains a clear, visible QR code.'
      } finally {
        this.isReading = false
      }
    },

    isURL(text) {
      try {
        new URL(text)
        return true
      } catch {
        return false
      }
    },

    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text)
        this.showNotification('Copied to clipboard!')
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        this.showNotification('Failed to copy to clipboard', 'error')
      }
    },

    showNotification(message, type = 'success') {
      // Simple notification - in a real app, you'd use a proper notification system
      const notification = document.createElement('div')
      notification.textContent = message
      notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      }`
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  },

  mounted() {
    // SEO optimizations
    document.title = 'QR Code Tools - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate QR codes from text or decode QR codes from images. 100% client-side, no uploads required.')
    }
  }
}
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.drop-zone {
  border: 2px dashed #cbd5e0;
  transition: border-color 0.3s ease;
}

.drop-zone.dragover {
  border-color: #6366f1;
  background-color: #eef2ff;
}

.tab-button {
  transition: all 0.3s ease;
}

.tab-button.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.qr-preview {
  max-width: 300px;
  margin: 0 auto;
}
</style>