/**
 * Routing Bridge - Ensures consistent navigation between static HTML and Vue SPA
 * This module provides seamless integration between static HTML files and Vue Router
 */

class RoutingBridge {
    constructor() {
        this.isVueSPAAvailable = false;
        this.currentPath = window.location.pathname;
        this.initializeRouting();
    }

    /**
     * Initialize the routing bridge
     */
    initializeRouting() {
        this.detectVueSPA();
        this.setupNavigationHandlers();
        this.handleInitialRoute();
        
        // Initialize breadcrumbs and navigation enhancements
        setTimeout(() => {
            this.createBreadcrumbs();
            this.enhanceNavigation();
        }, 100);
    }

    /**
     * Detect if Vue SPA is available by checking for Vue-specific elements
     */
    detectVueSPA() {
        // Check if we're on the main domain and Vue app exists
        const isMainDomain = window.location.pathname === '/' || window.location.pathname === '/index.html';
        const hasVueApp = document.getElementById('app') !== null;
        const hasVueScript = document.querySelector('script[src*="main-"]') !== null;
        
        this.isVueSPAAvailable = isMainDomain && hasVueApp && hasVueScript;
        
        // Also check if Vue is already loaded in the window
        if (window.Vue || window.__VUE__ || document.querySelector('[data-v-]')) {
            this.isVueSPAAvailable = true;
        }
    }

    /**
     * Handle initial route when page loads
     */
    handleInitialRoute() {
        // If we're on a static tool page but Vue SPA is preferred and available
        if (this.isToolPage() && this.shouldPreferSPA()) {
            this.redirectToSPA();
        }
    }

    /**
     * Check if current page is a tool page
     */
    isToolPage() {
        return this.currentPath.startsWith('/tools/') && this.currentPath.endsWith('.html');
    }

    /**
     * Check if SPA should be preferred over static HTML
     */
    shouldPreferSPA() {
        // Prefer SPA if:
        // 1. Vue SPA is available
        // 2. User came from SPA (check referrer)
        // 3. User has SPA preference in localStorage
        
        const cameFromSPA = document.referrer.includes(window.location.origin) && 
                           !document.referrer.includes('/tools/');
        const spaPreference = localStorage.getItem('prefer-spa') === 'true';
        
        return this.isVueSPAAvailable && (cameFromSPA || spaPreference);
    }

    /**
     * Redirect to Vue SPA route
     */
    redirectToSPA() {
        // Convert static HTML path to SPA path
        let spaPath = this.currentPath.replace('.html', '');
        
        // Show loading indicator
        this.showTransitionLoader();
        
        // Use history.pushState to navigate to SPA
        setTimeout(() => {
            window.history.pushState({}, '', spaPath);
            window.location.reload();
        }, 300);
    }

    /**
     * Setup navigation event handlers
     */
    setupNavigationHandlers() {
        // Intercept clicks on navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.shouldInterceptNavigation(link)) {
                e.preventDefault();
                this.handleNavigation(link.href);
            }
        });

        // Handle back/forward navigation
        window.addEventListener('popstate', (e) => {
            this.handlePopState(e);
        });
    }

    /**
     * Check if navigation should be intercepted
     */
    shouldInterceptNavigation(link) {
        const href = link.getAttribute('href');
        if (!href) return false;

        // Only intercept internal links
        const isInternal = href.startsWith('/') || 
                          href.startsWith('./') || 
                          href.startsWith('../') ||
                          href.includes(window.location.origin);

        // Don't intercept external links or downloads
        const isDownload = link.hasAttribute('download');
        const isExternal = href.startsWith('http') && !href.includes(window.location.origin);

        return isInternal && !isDownload && !isExternal;
    }

    /**
     * Handle navigation between static and SPA routes
     */
    handleNavigation(href) {
        const url = new URL(href, window.location.origin);
        const targetPath = url.pathname;

        // If navigating to home, prefer SPA if available
        if (targetPath === '/' || targetPath === '/index.html') {
            if (this.isVueSPAAvailable) {
                this.navigateToSPA('/');
            } else {
                window.location.href = href;
            }
            return;
        }

        // If navigating to a tool, choose appropriate route
        if (targetPath.startsWith('/tools/')) {
            this.navigateToTool(targetPath, href);
        } else {
            window.location.href = href;
        }
    }

    /**
     * Navigate to a tool (either static HTML or SPA route)
     */
    navigateToTool(targetPath, originalHref) {
        const toolName = targetPath.replace('/tools/', '').replace('.html', '');
        
        // If Vue SPA is available and user prefers it, use SPA route
        if (this.isVueSPAAvailable && this.shouldPreferSPA()) {
            this.navigateToSPA(`/tools/${toolName}`);
        } else {
            // Navigate to static HTML file
            const staticUrl = targetPath.endsWith('.html') ? originalHref : `${originalHref}.html`;
            window.location.href = staticUrl;
        }
    }

    /**
     * Navigate to SPA route
     */
    navigateToSPA(path) {
        this.showTransitionLoader();
        
        // Set preference for SPA
        localStorage.setItem('prefer-spa', 'true');
        
        setTimeout(() => {
            window.history.pushState({}, '', path);
            window.location.reload();
        }, 300);
    }

    /**
     * Enhanced SPA detection with fallback handling
     */
    detectVueSPA() {
        // Check if we're on the main domain and Vue app exists
        const isMainDomain = window.location.pathname === '/' || window.location.pathname === '/index.html';
        const hasVueApp = document.getElementById('app') !== null;
        const hasVueScript = document.querySelector('script[src*="main-"]') !== null;
        
        this.isVueSPAAvailable = isMainDomain && hasVueApp && hasVueScript;
        
        // Also check if Vue is already loaded in the window
        if (window.Vue || window.__VUE__ || document.querySelector('[data-v-]')) {
            this.isVueSPAAvailable = true;
        }
        
        // Enhanced detection: check for Vue router presence
        if (window.VueRouter || document.querySelector('router-view, router-link')) {
            this.isVueSPAAvailable = true;
        }
    }

    /**
     * Handle browser back/forward navigation
     */
    handlePopState(e) {
        // Let browser handle normal navigation
        // This is mainly for cleanup and state management
        this.currentPath = window.location.pathname;
    }

    /**
     * Show a smooth transition loader
     */
    showTransitionLoader() {
        // Create a simple loading overlay
        const loader = document.createElement('div');
        loader.id = 'routing-transition-loader';
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(102, 126, 234, 0.1);
                backdrop-filter: blur(2px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.3s ease;
            ">
                <div style="
                    background: white;
                    padding: 20px 30px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">
                    <div style="
                        width: 24px;
                        height: 24px;
                        border: 3px solid #667eea;
                        border-top: 3px solid transparent;
                        border-radius: 50%;
                        margin: 0 auto 12px;
                        animation: spin 1s linear infinite;
                    "></div>
                    <div style="color: #667eea; font-weight: 500;">Loading...</div>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.appendChild(loader);
        
        // Remove loader after navigation or timeout
        setTimeout(() => {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 3000);
    }

    /**
     * Create navigation breadcrumbs for consistent UX
     */
    createBreadcrumbs() {
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        if (!breadcrumbContainer) return;

        const pathParts = this.currentPath.split('/').filter(part => part);
        let breadcrumbs = '<a href="/" class="breadcrumb-link">Home</a>';
        
        if (pathParts.length > 0 && pathParts[0] === 'tools') {
            breadcrumbs += ' <span class="breadcrumb-separator">›</span> ';
            if (pathParts.length === 1) {
                breadcrumbs += '<span class="breadcrumb-current">Tools</span>';
            } else {
                breadcrumbs += '<a href="/tools" class="breadcrumb-link">Tools</a>';
                breadcrumbs += ' <span class="breadcrumb-separator">›</span> ';
                breadcrumbs += `<span class="breadcrumb-current">${this.formatToolName(pathParts[1])}</span>`;
            }
        }
        
        breadcrumbContainer.innerHTML = breadcrumbs;
    }

    /**
     * Format tool name for display
     */
    formatToolName(toolName) {
        return toolName
            .replace('.html', '')
            .replace('-', ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Add smart navigation suggestions and enhancements
     */
    enhanceNavigation() {
        // Add navigation state indicator
        const backButton = document.querySelector('.back-to-tools-btn');
        if (backButton) {
            // Add smart routing to the back button
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Check if user has navigation history
                if (window.history.length > 1 && document.referrer.includes(window.location.origin)) {
                    window.history.back();
                } else {
                    // Navigate to home with appropriate routing
                    this.handleNavigation('/');
                }
            });
        }

        // Add keyboard shortcuts for better UX
        document.addEventListener('keydown', (e) => {
            // Alt + H to go home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                this.handleNavigation('/');
            }
            
            // Escape to go back
            if (e.key === 'Escape' && window.history.length > 1) {
                window.history.back();
            }
        });
    }

    /**
     * Add smart navigation suggestions
     */
    addNavigationSuggestions() {
        // This could add "Related Tools" or "Quick Navigation" sections
        // Based on the current tool and user's navigation history
        const toolName = this.currentPath.replace('/tools/', '').replace('.html', '');
        
        // Add related tools suggestions based on tool type
        const suggestions = this.getRelatedTools(toolName);
        if (suggestions.length > 0) {
            this.createRelatedToolsSection(suggestions);
        }
    }

    /**
     * Get related tools based on current tool
     */
    getRelatedTools(currentTool) {
        const toolCategories = {
            'pdf': ['merge-pdf', 'split-pdf', 'pdf-to-image'],
            'image': ['resize-image', 'compress-image'],
            'utility': ['qr-tools']
        };

        let category = 'utility';
        if (currentTool.includes('pdf') || currentTool.includes('merge') || currentTool.includes('split')) {
            category = 'pdf';
        } else if (currentTool.includes('image') || currentTool.includes('resize') || currentTool.includes('compress')) {
            category = 'image';
        }

        return toolCategories[category].filter(tool => tool !== currentTool);
    }

    /**
     * Create related tools section
     */
    createRelatedToolsSection(suggestions) {
        const main = document.querySelector('main');
        if (!main || suggestions.length === 0) return;

        const relatedSection = document.createElement('div');
        relatedSection.className = 'bg-white rounded-lg shadow-lg p-6 mt-8';
        relatedSection.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Related Tools</h3>
            <div class="grid grid-cols-1 md:grid-cols-${suggestions.length > 2 ? '3' : suggestions.length} gap-4">
                ${suggestions.map(tool => `
                    <a href="/tools/${tool}" class="group block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                        <div class="text-blue-600 group-hover:text-blue-700 font-medium">${this.formatToolName(tool)}</div>
                        <div class="text-sm text-gray-600 mt-1">${this.getToolDescription(tool)}</div>
                    </a>
                `).join('')}
            </div>
        `;

        main.appendChild(relatedSection);
    }

    /**
     * Get tool description for suggestions
     */
    getToolDescription(tool) {
        const descriptions = {
            'merge-pdf': 'Combine multiple PDF files',
            'split-pdf': 'Extract pages from PDFs',
            'pdf-to-image': 'Convert PDF to images',
            'resize-image': 'Change image dimensions',
            'compress-image': 'Reduce image file size',
            'qr-tools': 'Generate and decode QR codes'
        };
        return descriptions[tool] || 'Useful tool';
    }
}

// Initialize routing bridge when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.routingBridge = new RoutingBridge();
    });
} else {
    window.routingBridge = new RoutingBridge();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoutingBridge;
}