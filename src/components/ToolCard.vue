<template>
  <router-link
    :to="toolPath"
    class="tool-card block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full"
  >
    <div class="text-center h-full flex flex-col">
      <div class="text-4xl mb-4">{{ icon }}</div>
      <h3 class="text-xl font-bold text-gray-800 mb-3">{{ title }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed flex-grow">{{ description }}</p>
      <div class="mt-4 text-indigo-600 font-medium text-sm">
        {{ actionText || 'Try Now →' }}
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