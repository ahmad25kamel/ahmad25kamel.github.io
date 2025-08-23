# Private Online Tools - Vue.js Version

A modern Vue.js + Vite implementation of privacy-first online tools that run 100% client-side in the browser.

## 🚀 Features

- **100% Client-Side Processing**: No files uploaded to servers
- **Vue 3 + Vite**: Modern, fast, and lightweight
- **TailwindCSS**: Utility-first CSS framework
- **Vue Router**: Single-page application with routing
- **Responsive Design**: Works on all devices
- **SEO Optimized**: Proper meta tags and structure
- **GitHub Pages**: Automatic deployment via GitHub Actions

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── AppHeader.vue   # Header with navigation
│   │   ├── AppFooter.vue   # Footer with support links
│   │   ├── SupportButton.vue # Floating support button
│   │   └── ToolCard.vue    # Tool card component
│   ├── views/              # Page-level components
│   │   ├── Home.vue        # Landing page
│   │   ├── QRTools.vue     # QR code generator/reader
│   │   ├── PDFMerge.vue    # PDF merger tool
│   │   ├── PDFSplit.vue    # PDF splitter tool
│   │   ├── PDFToImage.vue  # PDF to image converter
│   │   ├── ImageCompress.vue # Image compressor
│   │   └── ImageResize.vue # Image resizer
│   ├── styles/             # Global styles
│   │   └── main.css        # TailwindCSS + custom styles
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── public/                 # Static files
│   ├── assets/             # Images, fonts, etc.
│   ├── robots.txt          # SEO robots file
│   ├── sitemap.xml         # SEO sitemap
│   └── favicon.ico         # Favicon
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml          # Deployment workflow
├── dist/                   # Build output (generated)
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔧 Tools Available

### PDF Tools
- **PDF to Image**: Convert PDF pages to PNG/JPG images
- **Merge PDF**: Combine multiple PDF files into one
- **Split PDF**: Extract pages or split PDF into multiple files

### Image Tools  
- **Resize Image**: Change image dimensions with preview
- **Compress Image**: Reduce file size with quality control

### Privacy & Advanced Tools
- **QR Code Tools**: Generate and decode QR codes

## 🚀 Deployment

The project automatically deploys to GitHub Pages using GitHub Actions when pushed to the `main` branch.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Set source to "GitHub Actions"
3. Push changes to `main` branch
4. The site will be available at `https://username.github.io/repository-name`

## 🎨 Customization

### Adding New Tools

1. Create a new Vue component in `src/views/`
2. Add the route in `src/main.js`
3. Add a ToolCard in `src/views/Home.vue`
4. Update navigation if needed

### Styling

- Global styles: `src/styles/main.css`
- Component styles: Use scoped styles in `.vue` files
- TailwindCSS: Configure in `tailwind.config.js`

### SEO

- Update meta tags in component `mounted()` hooks
- Modify `public/sitemap.xml` for new pages
- Update `public/robots.txt` if needed

## 📦 Dependencies

### Core
- **Vue 3**: Progressive JavaScript framework
- **Vue Router 4**: Official router for Vue.js
- **Vite**: Fast build tool and dev server

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **PostCSS**: CSS preprocessing
- **Autoprefixer**: CSS vendor prefixing

### Development
- **@vitejs/plugin-vue**: Vite plugin for Vue SFC support

## 🌐 Browser Support

- Chrome 87+
- Firefox 78+
- Safari 14+
- Edge 88+

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 💖 Support

If these tools saved your time, consider supporting:

- 🇮🇩 [Saweria (Indonesia)](https://saweria.co/ahmad25kamel)
- 💖 [GitHub Sponsors](https://github.com/sponsors/ahmad25kamel)

---

Made with ❤️ in Indonesia by [Ahmad Kamel](https://github.com/ahmad25kamel)