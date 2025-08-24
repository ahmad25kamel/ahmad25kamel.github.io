import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SupportButton from '@/components/SupportButton.vue'

describe('SupportButton Component', () => {
  it('renders the support button', () => {
    const wrapper = mount(SupportButton)
    
    expect(wrapper.find('button').text()).toContain('Support')
    expect(wrapper.find('button').classes()).toContain('floating-btn')
  })

  it('shows modal when button is clicked', async () => {
    const wrapper = mount(SupportButton)
    
    // Initially modal should be hidden
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
    
    // Click the support button
    await wrapper.find('button').trigger('click')
    
    // Modal should now be visible
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('Support Private Online Tools')
  })

  it('hides modal when close button is clicked', async () => {
    const wrapper = mount(SupportButton)
    
    // Open modal first
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    
    // Click close button
    await wrapper.find('button[class*="text-gray-500"]').trigger('click')
    
    // Modal should be hidden
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('contains correct support links', async () => {
    const wrapper = mount(SupportButton)
    
    // Open modal
    await wrapper.find('button').trigger('click')
    
    // Check for Saweria link
    const saweriaLink = wrapper.find('a[href="https://saweria.co/ahmad25kamel"]')
    expect(saweriaLink.exists()).toBe(true)
    expect(saweriaLink.text()).toContain('Saweria')
    
    // Check for GitHub Sponsors link
    const githubLink = wrapper.find('a[href="https://github.com/sponsors/ahmad25kamel"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.text()).toContain('GitHub Sponsors')
  })
})