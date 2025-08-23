<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <AppHeader
      title="PDF to Image Converter"
      subtitle="Convert PDF pages to PNG/JPG images"
      :show-back-button="true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Upload Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Upload PDF File</h2>
        
        <!-- Drop Zone -->
        <div 
          ref="dropZone"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          :class="['drop-zone', 'rounded-lg', 'p-8', 'text-center', 'mb-4', 'border-2', 'border-dashed', 'transition-colors', isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300']"
        >
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <p class="text-gray-600 mb-2">Drag and drop your PDF file here</p>
          <p class="text-sm text-gray-500 mb-4">or</p>
          <input 
            ref="fileInput"
            type="file" 
            accept=".pdf" 
            @change="handleFileSelect"
            class="hidden"
          >
          <label 
            for="fileInput" 
            @click="$refs.fileInput.click()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer transition-colors inline-block"
          >
            Choose PDF File
          </label>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
            <select 
              v-model="outputFormat"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="png">PNG (Lossless)</option>
              <option value="jpg">JPG (Smaller file size)</option>
            </select>
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">Image Quality (for JPG)</label>
            <input 
              v-model="quality"
              type="range" 
              min="10" 
              max="100" 
              class="w-full"
            >
            <div class="text-sm text-gray-600 text-center mt-1">Quality: {{ quality }}%</div>
          </div>
        </div>
      </div>

      <!-- Library Error Message -->
      <div v-if="showLibraryError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <div>
            <h3 class="text-red-800 font-medium">Library Loading Issue</h3>
            <p class="text-red-700 text-sm">Required libraries couldn't be loaded. Please check your internet connection or disable ad blockers and refresh the page.</p>
          </div>
        </div>
      </div>

      <!-- Processing Status -->
      <div v-if="isProcessing" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div class="flex items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span class="text-blue-800">Processing PDF... {{ progressPercentage }}%</span>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="convertedImages.length > 0" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Converted Images</h2>
          <button 
            @click="downloadAllAsZip"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            📦 Download All as ZIP
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(image, index) in convertedImages" :key="index" class="border rounded-lg p-4">
            <img :src="image.dataUrl" :alt="`Page ${index + 1}`" class="w-full mb-2 rounded">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Page {{ index + 1 }}</span>
              <button 
                @click="downloadSingleImage(image, index)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">🔒 Privacy & Security</h3>
        <ul class="text-gray-600 space-y-2">
          <li>• Your PDF files are processed entirely in your browser</li>
          <li>• No files are uploaded to any server</li>
          <li>• All processing happens offline on your device</li>
          <li>• Perfect for confidential documents</li>
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

// We'll need to load PDF.js and JSZip dynamically
let pdfjsLib = null
let JSZip = null

export default {
  name: 'PDFToImage',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      isDragOver: false,
      isProcessing: false,
      progressPercentage: 0,
      outputFormat: 'png',
      quality: 90,
      convertedImages: [],
      showLibraryError: false
    }
  },
  async mounted() {
    document.title = 'PDF to Image - Private Online Tools'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert PDF pages to PNG/JPG images. Download individually or as ZIP. 100% client-side processing.')
    }

    // Load required libraries with local fallbacks
    await this.loadLibraries()
  },
  methods: {
    async loadLibraries() {
      try {
        // Load PDF.js - try CDN first, then local fallback
        if (!window.pdfjsLib) {
          try {
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
          } catch {
            // CDN failed, use local fallback
            await this.loadScript('/assets/js/vendor/pdf.min.js')
          }
          pdfjsLib = window.pdfjsLib
          if (pdfjsLib) {
            try {
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
            } catch {
              pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/js/vendor/pdf.worker.min.js'
            }
          }
        } else {
          pdfjsLib = window.pdfjsLib
        }

        // Load JSZip - try CDN first, then local fallback
        if (!window.JSZip) {
          try {
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js')
          } catch {
            // CDN failed, use local fallback
            await this.loadScript('/assets/js/vendor/jszip.min.js')
          }
          JSZip = window.JSZip
        } else {
          JSZip = window.JSZip
        }
      } catch (error) {
        console.error('Failed to load required libraries:', error)
        // Show user-friendly message if libraries can't be loaded
        this.showLibraryError = true
      }
    },

    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    },

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
      if (files.length > 0 && files[0].type === 'application/pdf') {
        this.processPDF(files[0])
      }
    },

    handleFileSelect(e) {
      const file = e.target.files[0]
      if (file && file.type === 'application/pdf') {
        this.processPDF(file)
      }
    },

    async processPDF(file) {
      if (!pdfjsLib) {
        alert('PDF processing library not loaded. Please refresh the page and try again.')
        return
      }

      this.isProcessing = true
      this.progressPercentage = 0
      this.convertedImages = []

      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
        const numPages = pdf.numPages

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const scale = 2.0
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width

          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise

          const dataUrl = canvas.toDataURL(
            this.outputFormat === 'png' ? 'image/png' : 'image/jpeg',
            this.outputFormat === 'jpg' ? this.quality / 100 : undefined
          )

          this.convertedImages.push({
            dataUrl,
            pageNumber: pageNum
          })

          this.progressPercentage = Math.round((pageNum / numPages) * 100)
        }
      } catch (error) {
        console.error('Error processing PDF:', error)
        alert('Error processing PDF. Please try again with a different file.')
      } finally {
        this.isProcessing = false
      }
    },

    downloadSingleImage(image, index) {
      const link = document.createElement('a')
      link.href = image.dataUrl
      link.download = `page-${index + 1}.${this.outputFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    async downloadAllAsZip() {
      if (!JSZip) {
        alert('ZIP library not loaded. Please refresh the page and try again.')
        return
      }

      try {
        const zip = new JSZip()

        this.convertedImages.forEach((image, index) => {
          const base64Data = image.dataUrl.split(',')[1]
          zip.file(`page-${index + 1}.${this.outputFormat}`, base64Data, { base64: true })
        })

        const content = await zip.generateAsync({ type: 'blob' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(content)
        link.download = 'pdf-images.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up object URL
        setTimeout(() => URL.revokeObjectURL(link.href), 100)
      } catch (error) {
        console.error('Error creating ZIP:', error)
        alert('Error creating ZIP file. You can download images individually instead.')
      }
    }
  }
}
</script>