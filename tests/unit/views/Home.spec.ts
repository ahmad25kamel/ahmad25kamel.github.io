import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// Create a mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tools/pdf-to-image.html', component: { template: '<div>PDF to Image</div>' } },
    { path: '/tools/merge-pdf.html', component: { template: '<div>Merge PDF</div>' } },
    { path: '/tools/split-pdf.html', component: { template: '<div>Split PDF</div>' } },
    { path: '/tools/resize-image.html', component: { template: '<div>Resize Image</div>' } },
    { path: '/tools/compress-image.html', component: { template: '<div>Compress Image</div>' } },
    { path: '/tools/qr-tools.html', component: { template: '<div>QR Tools</div>' } }
  ]
})

describe('Home Component', () => {
  it('renders the main header with correct content', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          ToolCard: {
            template: '<div class="tool-card">{{ title }} - {{ description }}</div>',
            props: ['icon', 'title', 'description', 'toolPath', 'colorScheme']
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

    expect(wrapper.text()).toContain('Private Online Tools')
    expect(wrapper.text()).toContain('All tools run 100% in your browser')
    expect(wrapper.text()).toContain('No files are ever uploaded')
    expect(wrapper.text()).toContain('Fast, private, and free')
  })

  it('displays PDF tools section', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          ToolCard: {
            template: '<div class="tool-card">{{ title }} - {{ description }}</div>',
            props: ['icon', 'title', 'description', 'toolPath', 'colorScheme']
          },
          AppFooter: { template: '<footer>Footer</footer>' },
          SupportButton: { template: '<button>Support</button>' }
        }
      }
    })

    expect(wrapper.text()).toContain('PDF to Image')
    expect(wrapper.text()).toContain('Merge PDF')
    expect(wrapper.text()).toContain('Split PDF')
    expect(wrapper.text()).toContain('Convert PDF pages to PNG/JPG images')
    expect(wrapper.text()).toContain('Combine multiple PDF files')
    expect(wrapper.text()).toContain('Extract specific pages')
  })

  it('displays Image tools section', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          ToolCard: {
            template: '<div class="tool-card">{{ title }} - {{ description }}</div>',
            props: ['icon', 'title', 'description', 'toolPath', 'colorScheme']
          },
          AppFooter: { template: '<footer>Footer</footer>' },
          SupportButton: { template: '<button>Support</button>' }
        }
      }
    })

    expect(wrapper.text()).toContain('Resize Image')
    expect(wrapper.text()).toContain('Compress Image')
    expect(wrapper.text()).toContain('Change image dimensions')
    expect(wrapper.text()).toContain('Reduce image file size')
  })

  it('displays QR tools', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          ToolCard: {
            template: '<div class="tool-card">{{ title }} - {{ description }}</div>',
            props: ['icon', 'title', 'description', 'toolPath', 'colorScheme']
          },
          AppFooter: { template: '<footer>Footer</footer>' },
          SupportButton: { template: '<button>Support</button>' }
        }
      }
    })

    expect(wrapper.text()).toContain('QR Code Tools')
    expect(wrapper.text()).toContain('Generate QR codes from text or decode QR codes from images')
  })

  it('has gradient background header', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          ToolCard: { template: '<div>Tool</div>', props: ['icon', 'title', 'description', 'toolPath', 'colorScheme'] },
          AppFooter: { template: '<footer>Footer</footer>' },
          SupportButton: { template: '<button>Support</button>' }
        }
      }
    })

    const header = wrapper.find('header')
    expect(header.classes()).toContain('gradient-bg')
    expect(header.classes()).toContain('text-white')
  })

  it('contains all required tool cards', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          ToolCard: {
            template: '<div class="tool-card">{{ title }}</div>',
            props: ['icon', 'title', 'description', 'toolPath', 'colorScheme']
          },
          AppFooter: { template: '<footer>Footer</footer>' },
          SupportButton: { template: '<button>Support</button>' }
        }
      }
    })

    const toolCards = wrapper.findAll('.tool-card')
    expect(toolCards.length).toBeGreaterThan(0)
    
    // Check that we have the expected number of tools (at least 6)
    const toolNames = ['PDF to Image', 'Merge PDF', 'Split PDF', 'Resize Image', 'Compress Image', 'QR Code Tools']
    toolNames.forEach(toolName => {
      expect(wrapper.text()).toContain(toolName)
    })
  })
})