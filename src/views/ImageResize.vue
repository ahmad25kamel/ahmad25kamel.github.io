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
      <!-- Upload Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Upload Image to Resize</h2>
        
        <!-- Drop Zone -->
        <div 
          ref="dropZone"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          :class="['drop-zone', 'rounded-lg', 'p-8', 'text-center', 'mb-4', 'border-2', 'border-dashed', 'transition-colors', isDragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300']"
        >
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p class="text-gray-600 mb-2">Drag and drop your image here</p>
          <p class="text-sm text-gray-500 mb-4">or</p>
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            @change="handleFileSelect"
            class="hidden"
          >
          <label 
            @click="$refs.fileInput.click()"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded cursor-pointer transition-colors inline-block"
          >
            Choose Image File
          </label>
        </div>
        
        <p class="text-sm text-gray-500 text-center">
          Supported formats: JPG, PNG, WebP, GIF
        </p>
      </div>

      <!-- Image Info Section -->
      <div v-if="originalImage" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Original Image Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Original Dimensions</p>
            <p class="font-semibold">{{ originalWidth }} × {{ originalHeight }}</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Aspect Ratio</p>
            <p class="font-semibold">{{ aspectRatio }}</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Format</p>
            <p class="font-semibold">{{ imageFormat }}</p>
          </div>
        </div>
      </div>

      <!-- Resize Controls -->
      <div v-if="originalImage" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Resize Settings</h2>
        
        <!-- Resize Method -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Resize Method</label>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input v-model="resizeMethod" type="radio" value="pixels" class="mr-2">
              <span>By Pixels</span>
            </label>
            <label class="flex items-center">
              <input v-model="resizeMethod" type="radio" value="percentage" class="mr-2">
              <span>By Percentage</span>
            </label>
          </div>
        </div>

        <!-- Pixel-based resizing -->
        <div v-if="resizeMethod === 'pixels'" class="mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Width (pixels)</label>
              <input 
                v-model.number="newWidth" 
                @input="updateFromWidth"
                type="number" 
                min="1" 
                class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Height (pixels)</label>
              <input 
                v-model.number="newHeight" 
                @input="updateFromHeight"
                type="number" 
                min="1" 
                class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              >
            </div>
          </div>
        </div>

        <!-- Percentage-based resizing -->
        <div v-if="resizeMethod === 'percentage'" class="mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Scale Percentage</label>
            <input 
              v-model.number="scalePercentage" 
              @input="updateFromPercentage"
              type="number" 
              min="1" 
              max="1000" 
              class="w-full md:w-48 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
            >
            <p class="text-sm text-gray-500 mt-1">New size: {{ Math.round(originalWidth * scalePercentage / 100) }} × {{ Math.round(originalHeight * scalePercentage / 100) }}</p>
          </div>
        </div>

        <!-- Maintain Aspect Ratio -->
        <div class="mb-6">
          <label class="flex items-center">
            <input v-model="maintainAspectRatio" type="checkbox" class="mr-2">
            <span class="text-sm font-medium text-gray-700">Maintain aspect ratio</span>
          </label>
        </div>

        <!-- Quick Size Presets -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Quick Size Presets</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button 
              v-for="preset in sizePresets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm transition-colors"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>

        <!-- Resize Button -->
        <button 
          @click="resizeImage"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          📏 Resize Image
        </button>
      </div>

      <!-- Before/After Preview -->
      <div v-if="resizedImage" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Before & After Preview</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Original Image -->
          <div class="text-center">
            <h3 class="font-medium text-gray-700 mb-3">Original</h3>
            <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <img 
                :src="originalImage" 
                alt="Original image" 
                class="max-w-full max-h-64 mx-auto object-contain"
              >
              <div class="mt-3 text-sm text-gray-600">
                <p>{{ originalWidth }} × {{ originalHeight }}</p>
              </div>
            </div>
          </div>

          <!-- Resized Image -->
          <div class="text-center">
            <h3 class="font-medium text-gray-700 mb-3">Resized</h3>
            <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <img 
                :src="resizedImage" 
                alt="Resized image" 
                class="max-w-full max-h-64 mx-auto object-contain"
              >
              <div class="mt-3 text-sm text-gray-600">
                <p>{{ resizedWidth }} × {{ resizedHeight }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="text-center mt-6">
          <button 
            @click="downloadResizedImage"
            class="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            💾 Download Resized Image
          </button>
        </div>
      </div>

      <!-- Info Section -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">🔒 Privacy & Security</h3>
        <ul class="text-gray-600 space-y-2">
          <li>• Your images are processed entirely in your browser</li>
          <li>• No files are uploaded to any server</li>
          <li>• All resizing happens offline on your device</li>
          <li>• Perfect for private or sensitive images</li>
        </ul>
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
  data() {
    return {
      isDragOver: false,
      originalImage: null,
      resizedImage: null,
      originalWidth: 0,
      originalHeight: 0,
      newWidth: 0,
      newHeight: 0,
      resizedWidth: 0,
      resizedHeight: 0,
      imageFormat: '',
      resizeMethod: 'pixels',
      scalePercentage: 100,
      maintainAspectRatio: true,
      sizePresets: [
        { name: 'HD (1920×1080)', width: 1920, height: 1080 },
        { name: 'Instagram (1080×1080)', width: 1080, height: 1080 },
        { name: 'Profile (400×400)', width: 400, height: 400 },
        { name: 'Thumbnail (150×150)', width: 150, height: 150 }
      ]
    }
  },
  computed: {
    aspectRatio() {
      if (!this.originalWidth || !this.originalHeight) return ''
      const gcd = this.getGCD(this.originalWidth, this.originalHeight)
      return `${this.originalWidth / gcd}:${this.originalHeight / gcd}`
    }
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault()
      this.isDragOver = true
    },

    handleDragEnter(e) {
      e.preventDefault()
      this.isDragOver = true
    },

    handleDragLeave(e) {
      e.preventDefault()
      this.isDragOver = false
    },

    handleDrop(e) {
      e.preventDefault()
      this.isDragOver = false
      
      const files = e.dataTransfer.files
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        this.processImage(files[0])
      }
    },

    handleFileSelect(e) {
      const file = e.target.files[0]
      if (file && file.type.startsWith('image/')) {
        this.processImage(file)
      }
    },

    processImage(file) {
      this.imageFormat = file.type.split('/')[1].toUpperCase()
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.originalImage = e.target.result
        
        // Get image dimensions
        const img = new Image()
        img.onload = () => {
          this.originalWidth = img.width
          this.originalHeight = img.height
          this.newWidth = img.width
          this.newHeight = img.height
          this.scalePercentage = 100
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    },

    updateFromWidth() {
      if (this.maintainAspectRatio) {
        const ratio = this.originalHeight / this.originalWidth
        this.newHeight = Math.round(this.newWidth * ratio)
      }
    },

    updateFromHeight() {
      if (this.maintainAspectRatio) {
        const ratio = this.originalWidth / this.originalHeight
        this.newWidth = Math.round(this.newHeight * ratio)
      }
    },

    updateFromPercentage() {
      this.newWidth = Math.round(this.originalWidth * this.scalePercentage / 100)
      this.newHeight = Math.round(this.originalHeight * this.scalePercentage / 100)
    },

    applyPreset(preset) {
      this.newWidth = preset.width
      this.newHeight = preset.height
      this.resizeMethod = 'pixels'
      this.maintainAspectRatio = false
    },

    resizeImage() {
      if (!this.originalImage) return

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        let targetWidth = this.newWidth
        let targetHeight = this.newHeight

        if (this.resizeMethod === 'percentage') {
          targetWidth = Math.round(this.originalWidth * this.scalePercentage / 100)
          targetHeight = Math.round(this.originalHeight * this.scalePercentage / 100)
        }

        canvas.width = targetWidth
        canvas.height = targetHeight
        
        // Use smooth scaling
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        
        this.resizedImage = canvas.toDataURL('image/png')
        this.resizedWidth = targetWidth
        this.resizedHeight = targetHeight
      }
      
      img.src = this.originalImage
    },

    downloadResizedImage() {
      if (!this.resizedImage) return
      
      const link = document.createElement('a')
      const fileName = `resized-image-${this.resizedWidth}x${this.resizedHeight}.png`
      
      link.href = this.resizedImage
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    getGCD(a, b) {
      return b === 0 ? a : this.getGCD(b, a % b)
    }
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