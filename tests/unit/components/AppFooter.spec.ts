import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter Component', () => {
  it('renders the footer with correct content', () => {
    const wrapper = mount(AppFooter)
    
    expect(wrapper.text()).toContain('Private Online Tools')
    expect(wrapper.text()).toContain('100% client-side tools that respect your privacy')
    expect(wrapper.text()).toContain('© 2024 Ahmad Kamel')
    expect(wrapper.text()).toContain('Made with ❤️ in Indonesia')
  })

  it('displays key features list', () => {
    const wrapper = mount(AppFooter)
    
    expect(wrapper.text()).toContain('Key Features')
    expect(wrapper.text()).toContain('100% Client-Side Processing')
    expect(wrapper.text()).toContain('No File Uploads')
    expect(wrapper.text()).toContain('No Tracking or Analytics')
    expect(wrapper.text()).toContain('Fast & Lightweight')
    expect(wrapper.text()).toContain('No Ads, Always Free')
  })

  it('contains correct support links', () => {
    const wrapper = mount(AppFooter)
    
    // Check for Saweria link
    const saweriaLink = wrapper.find('a[href="https://saweria.co/ahmad25kamel"]')
    expect(saweriaLink.exists()).toBe(true)
    expect(saweriaLink.text()).toContain('Saweria')
    expect(saweriaLink.attributes('target')).toBe('_blank')
    expect(saweriaLink.attributes('rel')).toBe('noopener noreferrer')
    
    // Check for GitHub Sponsors link
    const githubLink = wrapper.find('a[href="https://github.com/sponsors/ahmad25kamel"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.text()).toContain('GitHub Sponsors')
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('rel')).toBe('noopener noreferrer')
  })

  it('contains GitHub profile link', () => {
    const wrapper = mount(AppFooter)
    
    const githubProfileLink = wrapper.find('a[href="https://github.com/ahmad25kamel"]')
    expect(githubProfileLink.exists()).toBe(true)
    expect(githubProfileLink.attributes('aria-label')).toBe('GitHub Profile')
    expect(githubProfileLink.attributes('target')).toBe('_blank')
    expect(githubProfileLink.attributes('rel')).toBe('noopener noreferrer')
  })

  it('has correct styling classes', () => {
    const wrapper = mount(AppFooter)
    
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('bg-gray-800')
    expect(footer.classes()).toContain('text-white')
    expect(footer.classes()).toContain('py-8')
  })

  it('displays support section with correct messaging', () => {
    const wrapper = mount(AppFooter)
    
    expect(wrapper.text()).toContain('Support the Project')
    expect(wrapper.text()).toContain('If these tools saved your time, consider supporting ❤️')
  })
})