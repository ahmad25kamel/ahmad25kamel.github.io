# Copilot Instructions for Private Online Tools

## Project Overview
This is a privacy-first collection of online tools that run 100% client-side in the browser. No files are uploaded to servers, ensuring complete user privacy.

## Key Principles

### 1. Privacy & Security First
- All processing must happen client-side
- No file uploads to servers
- No external API calls for data processing
- Local storage only when necessary

### 2. Self-Sufficient Dependencies
- Avoid external CDN dependencies where possible
- Use self-hosted libraries when needed
- Create fallbacks for blocked CDNs
- Prefer vanilla JavaScript over heavy frameworks

### 3. Consistent UI/UX
- Use TailwindCSS for styling (local version when possible)
- Maintain consistent gradient header: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Every tool page must include:
  - Floating support button (bottom-right)
  - Footer with support links
  - Consistent header with "← Back to Tools" link

### 4. Support & Monetization
- Only use Indonesia-friendly payment options:
  - Saweria (primary for Indonesia): `https://saweria.co/ahmad25kamel`
  - GitHub Sponsors: `https://github.com/sponsors/ahmad25kamel`
- No buymeacoffee (not supported in Indonesia)
- Keep "No Ads" as a key benefit

### 5. Internationalization (i18n)
- Support multiple languages: English, Indonesian, Chinese, Arabic, Japanese
- Use automatic language detection based on browser locale
- Fallback to English for unsupported languages
- Implement proper RTL support for Arabic

### 6. SEO & Accessibility
- Each tool should have specific keywords for SEO
- Proper meta descriptions for every page
- Semantic HTML structure
- Alt text for images
- Proper heading hierarchy

### 7. Code Structure
- Keep HTML, CSS, and JavaScript in single files for simplicity
- Use modular JavaScript functions
- Comment complex logic
- Use consistent naming conventions
- Error handling for file operations

## File Structure Requirements

### Tool Pages
Each tool in `/tools/` directory must include:
```html
<!-- Essential meta tags -->
<meta name="description" content="[Specific tool description]">
<meta name="keywords" content="[Tool-specific keywords]">

<!-- Local CSS (preferred) or CDN fallback -->
<link rel="stylesheet" href="../assets/css/minimal-tailwind.css">

<!-- Consistent header -->
<header class="gradient-bg text-white py-4">
  <!-- Header content with back link -->
</header>

<!-- Main content -->
<main class="container mx-auto px-4 py-8">
  <!-- Tool-specific content -->
</main>

<!-- Footer -->
<footer class="bg-gray-800 text-white py-8">
  <!-- Support message -->
</footer>

<!-- Floating support button -->
<button id="supportBtn" class="floating-btn">☕ Support</button>

<!-- Support modal -->
<div id="supportModal">
  <!-- Saweria and GitHub Sponsors links only -->
</div>
```

### Assets Structure
- `/assets/css/` - Local CSS files
- `/assets/js/vendor/` - Self-hosted libraries
- `/assets/img/` - Images and icons
- `/assets/fonts/` - Custom fonts

## Development Guidelines

### Adding New Tools
1. Create HTML file in `/tools/` directory
2. Follow the consistent template structure
3. Include proper SEO meta tags
4. Add to main page navigation
5. Update sitemap.xml
6. Test all functionality offline

### Updating Existing Tools
1. Maintain backward compatibility
2. Keep self-hosted dependencies
3. Test all user flows
4. Ensure mobile responsiveness
5. Validate HTML/CSS

### Testing Checklist
- [ ] Works without internet connection
- [ ] Mobile responsive design
- [ ] All buttons and features functional
- [ ] Error handling for edge cases
- [ ] Cross-browser compatibility
- [ ] No console errors
- [ ] Proper file handling (no uploads)

## Contact Information
- Location: Indonesia
- GitHub: ahmad25kamel
- Support: Saweria and GitHub Sponsors only

## Common Issues & Solutions

### CDN Dependencies
If a CDN is blocked:
1. Download the library locally
2. Host in `/assets/js/vendor/`
3. Update references in HTML
4. Create minimal version if possible

### Browser Compatibility
- Support modern browsers (ES6+)
- Provide graceful degradation
- Test on mobile devices
- Handle file API limitations

### Performance
- Optimize image loading
- Minimize JavaScript bundle size
- Use efficient algorithms for processing
- Show progress indicators for long operations

Remember: Always prioritize user privacy and local processing over convenience or external dependencies.