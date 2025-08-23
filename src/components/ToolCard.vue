<template>
  <router-link
    :to="toolPath"
    class="tool-card block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full border border-gray-100 flex flex-col"
  >
    <div class="text-center h-full flex flex-col">
      <div :class="iconBackgroundClass" class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg">
        <div class="text-2xl">{{ icon }}</div>
      </div>
      <h3 class="text-xl font-bold text-gray-800 mb-3">{{ title }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed flex-grow mb-6">{{ description }}</p>
      <div class="mt-auto">
        <div :class="buttonClass" class="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg transform hover:scale-105 transition-all duration-300 w-full justify-center">
          {{ actionText || 'Open Tool' }}
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ToolCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    toolPath: {
      type: String,
      required: true
    },
    actionText: {
      type: String,
      default: 'Open Tool'
    },
    colorScheme: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'green', 'purple', 'yellow', 'red', 'indigo'].includes(value)
    }
  },
  computed: {
    iconBackgroundClass() {
      const schemes = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        red: 'bg-red-100 text-red-600',
        indigo: 'bg-indigo-100 text-indigo-600'
      }
      return schemes[this.colorScheme] || schemes.blue
    },
    buttonClass() {
      const schemes = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700', 
        purple: 'bg-purple-600 hover:bg-purple-700',
        yellow: 'bg-yellow-600 hover:bg-yellow-700',
        red: 'bg-red-600 hover:bg-red-700',
        indigo: 'bg-indigo-600 hover:bg-indigo-700'
      }
      return schemes[this.colorScheme] || schemes.blue
    }
  }
}
</script>