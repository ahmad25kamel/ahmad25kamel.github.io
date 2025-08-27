/**
 * Dark Mode Toggle Implementation
 * Provides a theme toggle with localStorage persistence
 * Compatible with system preference detection
 */

class ThemeToggle {
    constructor() {
        this.storageKey = 'user-theme-preference';
        this.themes = {
            light: { icon: '🌙', text: 'Dark' },
            dark: { icon: '☀️', text: 'Light' }
        };
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setInitialTheme();
        
        // Create toggle button
        this.createToggleButton();
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }
    
    setInitialTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        
        this.setTheme(initialTheme, false);
    }
    
    setTheme(theme, save = true) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (save) {
            localStorage.setItem(this.storageKey, theme);
        }
        
        this.updateToggleButton(theme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    createToggleButton() {
        // Check if button already exists
        if (document.getElementById('theme-toggle')) {
            return;
        }
        
        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.setAttribute('title', 'Toggle theme');
        
        // Add click handler
        button.addEventListener('click', () => this.toggleTheme());
        
        // Add to page
        document.body.appendChild(button);
        
        // Set initial content
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.updateToggleButton(currentTheme);
    }
    
    updateToggleButton(theme) {
        const button = document.getElementById('theme-toggle');
        if (!button) return;
        
        const themeConfig = this.themes[theme];
        button.innerHTML = `
            <span role="img" aria-hidden="true">${themeConfig.icon}</span>
            <span>${themeConfig.text}</span>
        `;
    }
    
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem(this.storageKey)) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.setTheme(systemTheme, false);
            }
        });
    }
}

// Initialize theme toggle when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
} else {
    new ThemeToggle();
}

// Export for manual initialization if needed
window.ThemeToggle = ThemeToggle;