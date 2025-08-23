<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-bold mb-4">Private Online Tools</h3>
          <p class="text-gray-300 mb-4">
            100% client-side tools that respect your privacy. No uploads, no tracking, just fast and secure processing in your browser.
          </p>
          <div class="flex space-x-4">
            <a
              href="https://github.com/ahmad25kamel"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Features Section -->
        <div>
          <h3 class="text-lg font-bold mb-4">Key Features</h3>
          <ul class="text-gray-300 space-y-2">
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              100% Client-Side Processing
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              No File Uploads
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              No Tracking or Analytics
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Fast & Lightweight
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              No Ads, Always Free
            </li>
          </ul>
        </div>

        <!-- Support Section -->
        <div>
          <h3 class="text-lg font-bold mb-4">Support the Project</h3>
          <p class="text-gray-300 mb-4">
            If these tools saved your time, consider supporting ❤️
          </p>
          <div class="space-y-3">
            <a
              href="https://saweria.co/ahmad25kamel"
              target="_blank"
              rel="noopener noreferrer"
              class="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-center font-medium"
            >
              🇮🇩 Saweria
            </a>
            <a
              href="https://github.com/sponsors/ahmad25kamel"
              target="_blank"
              rel="noopener noreferrer"
              class="block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-center font-medium"
            >
              💖 GitHub Sponsors
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Ahmad Kamel. Privacy-first tools for everyone.</p>
        <p class="mt-2 text-sm">Made with ❤️ in Indonesia</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>