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
      <!-- Upload Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Upload Image to Compress</h2>
        
        <!-- Drop Zone -->
        <div 
          ref="dropZone"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          :class="['drop-zone', 'rounded-lg', 'p-8', 'text-center', 'mb-4', 'border-2', 'border-dashed', 'transition-colors', isDragOver ? 'border-red-500 bg-red-50' : 'border-gray-300']"
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
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded cursor-pointer transition-colors inline-block"
          >
            Choose Image File
          </label>
        </div>
        
        <p class="text-sm text-gray-500 text-center">
          Supported formats: JPG, PNG, WebP (PNG will be converted to JPG for compression)
        </p>
      </div>

      <!-- Image Info Section -->
      <div v-if="originalImage" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Image Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Dimensions</p>
            <p class="font-semibold">{{ imageDimensions }}</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Original Size</p>
            <p class="font-semibold">{{ formatFileSize(originalFileSize) }}</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Format</p>
            <p class="font-semibold">{{ imageFormat }}</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600">Color Depth</p>
            <p class="font-semibold">24-bit</p>
          </div>
        </div>
      </div>

      <!-- Compression Controls -->
      <div v-if="originalImage" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Compression Settings</h2>
        
        <!-- Output Format -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
          <select 
            v-model="outputFormat" 
            @change="compressImage"
            class="w-full md:w-48 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="jpg">JPG (Best compression)</option>
            <option value="webp">WebP (Modern, smaller)</option>
            <option value="png">PNG (Lossless, larger)</option>
          </select>
          <p class="text-sm text-gray-500 mt-1">JPG and WebP offer the best compression for photos</p>
        </div>

        <!-- Quality Slider -->
        <div v-if="outputFormat !== 'png'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Compression Quality</label>
          <div class="space-y-3">
            <input 
              v-model="quality" 
              @input="compressImage"
              type="range" 
              min="10" 
              max="100" 
              class="w-full"
            >
            <div class="flex justify-between text-sm text-gray-600">
              <span>Smaller file (10%)</span>
              <span class="font-semibold">Quality: {{ quality }}%</span>
              <span>Best quality (100%)</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div v-if="outputFormat !== 'png'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button 
              v-for="preset in qualityPresets"
              :key="preset.value"
              @click="setQuality(preset.value)"
              class="bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm transition-colors"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>

        <!-- Compress Button -->
        <button 
          @click="compressImage"
          class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          🗜️ Compress Image
        </button>
      </div>

      <!-- Before/After Comparison -->
      <div v-if="compressedImage" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Before & After Comparison</h2>
        
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
                <p>Size: {{ formatFileSize(originalFileSize) }}</p>
                <p>Format: {{ imageFormat }}</p>
              </div>
            </div>
          </div>

          <!-- Compressed Image -->
          <div class="text-center">
            <h3 class="font-medium text-gray-700 mb-3">Compressed</h3>
            <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <img 
                :src="compressedImage" 
                alt="Compressed image" 
                class="max-w-full max-h-64 mx-auto object-contain"
              >
              <div class="mt-3 text-sm text-gray-600">
                <p>Size: {{ formatFileSize(compressedFileSize) }}</p>
                <p>Format: {{ outputFormat.toUpperCase() }}</p>
                <p class="font-semibold" :class="compressionRatio < 50 ? 'text-green-600' : compressionRatio < 80 ? 'text-yellow-600' : 'text-red-600'">
                  {{ compressionRatio }}% of original size
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="text-center mt-6">
          <button 
            @click="downloadCompressedImage"
            class="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            💾 Download Compressed Image
          </button>
        </div>
      </div>

      <!-- Info Section -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">🔒 Privacy & Security</h3>
        <ul class="text-gray-600 space-y-2">
          <li>• Your images are processed entirely in your browser</li>
          <li>• No files are uploaded to any server</li>
          <li>• All compression happens offline on your device</li>
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
  name: 'ImageCompress',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      isDragOver: false,
      originalImage: null,
      compressedImage: null,
      originalFileSize: 0,
      compressedFileSize: 0,
      imageDimensions: '',
      imageFormat: '',
      outputFormat: 'jpg',
      quality: 80,
      qualityPresets: [
        { label: 'High Quality (90%)', value: 90 },
        { label: 'Good Quality (80%)', value: 80 },
        { label: 'Medium (60%)', value: 60 },
        { label: 'Small Size (40%)', value: 40 }
      ]
    }
  },
  computed: {
    compressionRatio() {
      if (!this.originalFileSize || !this.compressedFileSize) return 0
      return Math.round((this.compressedFileSize / this.originalFileSize) * 100)
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
      this.originalFileSize = file.size
      this.imageFormat = file.type.split('/')[1].toUpperCase()
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.originalImage = e.target.result
        
        // Get image dimensions
        const img = new Image()
        img.onload = () => {
          this.imageDimensions = `${img.width} × ${img.height}`
          this.compressImage()
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    },

    compressImage() {
      if (!this.originalImage) return

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        ctx.drawImage(img, 0, 0)
        
        let mimeType = 'image/jpeg'
        let quality = this.quality / 100
        
        if (this.outputFormat === 'png') {
          mimeType = 'image/png'
          quality = undefined // PNG doesn't use quality parameter
        } else if (this.outputFormat === 'webp') {
          mimeType = 'image/webp'
        }
        
        this.compressedImage = canvas.toDataURL(mimeType, quality)
        
        // Calculate compressed file size (approximate)
        const base64Length = this.compressedImage.split(',')[1].length
        this.compressedFileSize = Math.round((base64Length * 3) / 4)
      }
      
      img.src = this.originalImage
    },

    setQuality(value) {
      this.quality = value
      this.compressImage()
    },

    downloadCompressedImage() {
      if (!this.compressedImage) return
      
      const link = document.createElement('a')
      const fileName = `compressed-image.${this.outputFormat}`
      
      link.href = this.compressedImage
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
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