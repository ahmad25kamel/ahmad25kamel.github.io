<template>
  <router-link
    :to="toolPath"
    class="tool-card block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full border border-gray-100"
  >
    <div class="text-center h-full flex flex-col">
      <div class="text-5xl mb-4 transform hover:scale-110 transition-transform duration-300">{{ icon }}</div>
      <h3 class="text-xl font-bold text-gray-800 mb-3">{{ title }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed flex-grow mb-4">{{ description }}</p>
      <div class="mt-auto">
        <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-full transform hover:scale-105 transition-all duration-300">
          {{ actionText || 'Try Now' }}
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
      default: 'Try Now →'
    }
  }
}
</script>