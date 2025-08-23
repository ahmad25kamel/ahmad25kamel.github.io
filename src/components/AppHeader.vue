<template>
  <header class="gradient-bg text-white py-6 lg:py-8">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link
            v-if="showBackButton"
            to="/"
            class="flex items-center text-white hover:text-gray-200 transition-colors bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="hidden sm:inline">Back to Tools</span>
            <span class="sm:hidden">Back</span>
          </router-link>
          <div>
            <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold">{{ title }}</h1>
            <p v-if="subtitle" class="text-sm lg:text-lg opacity-90 mt-1">{{ subtitle }}</p>
          </div>
        </div>
        
        <!-- Language Selector (if needed) -->
        <div v-if="showLanguageSelector" class="language-selector">
          <button
            @click="showLanguageDropdown = !showLanguageDropdown"
            class="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-colors"
          >
            <span>🌐</span>
            <span class="hidden md:inline">{{ currentLanguage }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div v-if="showLanguageDropdown" class="language-dropdown mt-2 py-2">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang)"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              {{ lang.flag }} {{ lang.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    showBackButton: {
      type: Boolean,
      default: false
    },
    showLanguageSelector: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLanguageDropdown: false,
      currentLanguage: 'English',
      languages: [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
        { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
        { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
        { code: 'ja', name: 'Japanese', flag: '🇯🇵' }
      ]
    }
  },
  methods: {
    selectLanguage(language) {
      this.currentLanguage = language.name
      this.showLanguageDropdown = false
      // Emit language change event for parent components to handle
      this.$emit('language-changed', language.code)
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showLanguageDropdown = false
      }
    })
  }
}
</script>