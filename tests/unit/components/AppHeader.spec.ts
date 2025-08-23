import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

// Create a mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } }
  ]
})

describe('AppHeader Component', () => {
  it('renders title correctly', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Test Page Title'
      }
    })

    expect(wrapper.text()).toContain('Test Page Title')
    expect(wrapper.find('h1').text()).toBe('Test Page Title')
  })

  it('renders subtitle when provided', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Main Title',
        subtitle: 'This is a subtitle'
      }
    })

    expect(wrapper.text()).toContain('This is a subtitle')
    expect(wrapper.find('p').text()).toBe('This is a subtitle')
  })

  it('shows back button when showBackButton is true', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Tool Page',
        showBackButton: true
      }
    })

    const backButton = wrapper.findComponent({ name: 'RouterLink' })
    expect(backButton.exists()).toBe(true)
    expect(backButton.props('to')).toBe('/')
    expect(backButton.text()).toContain('Back to Tools')
  })

  it('hides back button when showBackButton is false', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Home Page',
        showBackButton: false
      }
    })

    expect(wrapper.findComponent({ name: 'RouterLink' }).exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Back to Tools')
  })

  it('shows language selector when showLanguageSelector is true', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Global Page',
        showLanguageSelector: true
      }
    })

    expect(wrapper.find('.language-selector').exists()).toBe(true)
    expect(wrapper.text()).toContain('🌐')
  })

  it('has correct gradient background class', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Styled Page'
      }
    })

    expect(wrapper.find('header').classes()).toContain('gradient-bg')
  })
})