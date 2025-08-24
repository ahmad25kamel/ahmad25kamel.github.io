# Private Online Tools - Simplified

Collection of privacy-first online tools that run 100% client-side in your browser. No files uploaded to servers, no external dependencies, completely private and fast.

## 🚀 Features

- **100% Client-Side Processing**: No files uploaded to servers
- **Privacy First**: All processing happens in your browser
- **No External Dependencies**: Self-hosted libraries only
- **Lightning Fast**: No waiting for uploads or downloads
- **Clean Interface**: No ads, distraction-free
- **Cross-Platform**: Works on all modern browsers

## 🛠️ Available Tools

### Working Tools
- **QR Code Tools** - Generate and scan QR codes
- **Image Tools** - Compress and resize images

### In Development
- **PDF Tools** - Convert, split, and merge PDFs (fixing CDN dependencies)

## 🏗️ Architecture Simplification

This project has been simplified from a complex Vue.js + Vite setup to vanilla HTML/CSS/JavaScript for better reliability and privacy:

### Why Simplified?
- **Eliminated CDN Dependencies**: No external library loading failures
- **Removed Build Complexity**: Direct HTML files, no build process needed
- **Better Privacy**: No external requests during usage
- **Easier Maintenance**: Single HTML files with embedded functionality
- **Faster Loading**: No framework overhead

### Project Structure
```
/
├── index.html              # Main landing page (vanilla HTML)
├── tools/                  # Individual tool pages
│   ├── qr-tools.html      # QR code generator/scanner ✅
│   ├── compress-image.html # Image compression
│   ├── resize-image.html   # Image resizing
│   └── pdf-*.html         # PDF tools (being fixed)
├── assets/
│   ├── css/               # Self-hosted CSS
│   └── js/vendor/         # Local JavaScript libraries
└── public/assets/         # Static assets
```

## 🚀 Development

### Running Locally
```bash
# Simple HTTP server (no build process needed)
python3 -m http.server 8000
```

### Adding New Tools
1. Create a new HTML file in `/tools/` directory
2. Follow the existing template structure
3. Use only local/self-hosted libraries
4. Add link to main landing page

## 🔧 Recent Changes

**Simplified from Vue.js to Vanilla HTML** (addressing "overcomplicated" feedback):
- ✅ Removed Vue.js + Vite build complexity
- ✅ Eliminated external CDN dependencies
- ✅ Fixed module loading errors
- ✅ Simplified navigation and routing
- ✅ Improved reliability and privacy

## 💖 Support

If these tools saved your time, consider supporting:

- 🇮🇩 [Saweria (Indonesia)](https://saweria.co/ahmad25kamel)
- 💖 [GitHub Sponsors](https://github.com/sponsors/ahmad25kamel)

## 📄 License

MIT License

---

Made with ❤️ in Indonesia by [Ahmad Kamel](https://github.com/ahmad25kamel)