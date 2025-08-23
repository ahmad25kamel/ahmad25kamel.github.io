<template>
  <div>
    <!-- Floating Support Button -->
    <button
      @click="showModal = true"
      class="floating-btn"
      aria-label="Support this project"
    >
      ☕ Support
    </button>

    <!-- Support Modal -->
    <transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="text-center">
            <h3 class="text-xl font-bold mb-4 text-gray-800">
              ❤️ Support Private Online Tools
            </h3>
            <p class="text-gray-600 mb-6">
              If these tools saved your time, consider supporting the development!
            </p>
            
            <div class="space-y-4">
              <!-- Saweria (Primary for Indonesia) -->
              <a
                href="https://saweria.co/ahmad25kamel"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                🇮🇩 Saweria (Indonesia)
              </a>
              
              <!-- GitHub Sponsors -->
              <a
                href="https://github.com/sponsors/ahmad25kamel"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                💖 GitHub Sponsors
              </a>
            </div>
            
            <button
              @click="showModal = false"
              class="mt-6 text-gray-500 hover:text-gray-700 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SupportButton',
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal(event) {
      if (event.target === event.currentTarget) {
        this.showModal = false
      }
    }
  },
  mounted() {
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showModal) {
        this.showModal = false
      }
    })
  }
}
</script>