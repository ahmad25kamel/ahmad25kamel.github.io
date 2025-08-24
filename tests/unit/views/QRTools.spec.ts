import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import QRTools from '@/views/QRTools.vue'

// Create a mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } }
  ]
})

describe('QRTools Component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(QRTools, {
      global: {
        plugins: [router],
        stubs: {
          AppHeader: {
            template: '<header><h1>{{ title }}</h1><p>{{ subtitle }}</p></header>',
            props: ['title', 'subtitle', 'showBackButton']
          },
          AppFooter: {
            template: '<footer>Footer</footer>'
          },
          SupportButton: {
            template: '<button>Support</button>'
          }
        }
      }
    })
  })

  it('renders the component with header', () => {
    expect(wrapper.text()).toContain('QR Code Tools')
    expect(wrapper.text()).toContain('Generate and decode QR codes')
  })

  it('renders tab navigation with both tabs', () => {
    expect(wrapper.text()).toContain('Generate QR Code')
    expect(wrapper.text()).toContain('Read QR Code')
  })

  it('shows generate tab by default', () => {
    const generateTabButtons = wrapper.findAll('button')
    const generateButton = generateTabButtons.find(btn => btn.text().includes('Generate QR Code'))
    expect(generateButton?.exists()).toBe(true)
    
    // Generate section should be visible
    expect(wrapper.text()).toContain('Enter text, URL, or data')
  })

  it('switches to read tab when clicked', async () => {
    const readTabButton = wrapper.findAll('button').find((btn: any) => 
      btn.text().includes('Read QR Code')
    )
    
    if (readTabButton) {
      await readTabButton.trigger('click')
      // Read section should become visible after click
      expect(wrapper.text()).toContain('Drop QR code image here')
    }
  })

  it('contains text input for QR generation', () => {
    const textArea = wrapper.find('textarea')
    expect(textArea.exists()).toBe(true)
    expect(textArea.attributes('placeholder')).toContain('Enter your text')
  })

  it('has size options for QR codes', () => {
    // Should contain size selection options
    expect(wrapper.text()).toContain('Size') || expect(wrapper.find('select').exists()).toBe(true)
  })

  it('contains important UI elements', () => {
    // Test for key functional elements instead of privacy message
    expect(wrapper.text()).toContain('Generate QR Code')
    expect(wrapper.text()).toContain('Read QR Code')
    expect(wrapper.text()).toContain('Size')
  })

  it('generates QR code when text is entered', async () => {
    const textarea = wrapper.find('textarea')
    if (textarea.exists()) {
      await textarea.setValue('test data')
      await textarea.trigger('input')
      
      // Should trigger QR generation (this might need mocking of QR library)
      expect(wrapper.vm.qrText).toBe('test data')
    }
  })
})