import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ToolCard from '@/components/ToolCard.vue'

// Create a mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/tools/test', component: { template: '<div>Test</div>' } },
    { path: '/tools/custom', component: { template: '<div>Custom</div>' } },
    { path: '/tools/speed', component: { template: '<div>Speed</div>' } }
  ]
})

describe('ToolCard Component', () => {
  it('renders tool information correctly', () => {
    const wrapper = mount(ToolCard, {
      global: {
        plugins: [router]
      },
      props: {
        icon: '📄',
        title: 'Test Tool',
        description: 'This is a test tool',
        toolPath: '/tools/test'
      }
    })

    expect(wrapper.text()).toContain('Test Tool')
    expect(wrapper.text()).toContain('This is a test tool')
    expect(wrapper.text()).toContain('📄')
    
    const link = wrapper.findComponent({ name: 'RouterLink' })
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/tools/test')
  })

  it('displays custom action text when provided', () => {
    const wrapper = mount(ToolCard, {
      global: {
        plugins: [router]
      },
      props: {
        icon: '🔧',
        title: 'Custom Tool',
        description: 'Custom description',
        toolPath: '/tools/custom',
        actionText: 'Launch Tool'
      }
    })

    expect(wrapper.text()).toContain('Launch Tool')
  })

  it('has correct CSS classes for styling', () => {
    const wrapper = mount(ToolCard, {
      global: {
        plugins: [router]
      },
      props: {
        icon: '⚡',
        title: 'Speed Tool',
        description: 'Fast processing',
        toolPath: '/tools/speed'
      }
    })

    const link = wrapper.findComponent({ name: 'RouterLink' })
    expect(link.classes()).toContain('tool-card')
    expect(link.classes()).toContain('bg-white')
    expect(link.classes()).toContain('rounded-xl')
  })
})