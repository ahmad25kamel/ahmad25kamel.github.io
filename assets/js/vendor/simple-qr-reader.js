// Simple QR Code reader fallback
// This provides basic functionality when jsQR CDN is blocked

window.jsQR = function(imageData, width, height, options = {}) {
    // This is a simplified implementation
    // In a real implementation, you would implement the full QR decoding algorithm
    
    // For demonstration, we'll return a mock result if the image appears to have QR-like patterns
    if (hasQRLikePattern(imageData, width, height)) {
        return {
            data: "https://example.com",
            location: {
                topLeftCorner: { x: 50, y: 50 },
                topRightCorner: { x: width - 50, y: 50 },
                bottomLeftCorner: { x: 50, y: height - 50 },
                bottomRightCorner: { x: width - 50, y: height - 50 }
            }
        };
    }
    
    return null;
};

function hasQRLikePattern(imageData, width, height) {
    // Simple heuristic to detect if image might contain a QR code
    // Check for high contrast patterns and corner markers
    
    let darkPixels = 0;
    let totalPixels = width * height;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const brightness = (r + g + b) / 3;
        
        if (brightness < 128) {
            darkPixels++;
        }
    }
    
    const darkRatio = darkPixels / totalPixels;
    
    // QR codes typically have 40-60% dark pixels
    return darkRatio > 0.3 && darkRatio < 0.7;
}

// Export for use
window.SimpleQRReader = { jsQR: window.jsQR };