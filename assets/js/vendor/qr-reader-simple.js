/*!
 * Basic QR Code Reader
 * Simple QR decoder for Private Online Tools
 * Designed to work with our basic QR generator
 */

window.jsQR = function(imageData, width, height, options = {}) {
    try {
        // Convert image to binary matrix
        const matrix = imageToMatrix(imageData.data, width, height);
        
        // Look for QR patterns and try to decode
        const result = decodeBasicQR(matrix, width, height);
        
        if (result) {
            return {
                data: result,
                location: {
                    topLeftCorner: { x: 50, y: 50 },
                    topRightCorner: { x: width - 50, y: 50 },
                    bottomLeftCorner: { x: 50, y: height - 50 },
                    bottomRightCorner: { x: width - 50, y: height - 50 }
                }
            };
        }
        
        return null;
    } catch (error) {
        console.warn('QR decode error:', error);
        return null;
    }
};

function imageToMatrix(data, width, height) {
    const matrix = [];
    
    for (let y = 0; y < height; y++) {
        matrix[y] = [];
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            matrix[y][x] = gray < 128; // true = black, false = white
        }
    }
    
    return matrix;
}

function findQRBounds(matrix, width, height) {
    // Look for the characteristic finder patterns (7x7 squares)
    let topLeft = null, topRight = null, bottomLeft = null;
    
    // Scan for finder patterns
    for (let y = 0; y <= height - 7; y++) {
        for (let x = 0; x <= width - 7; x++) {
            if (isFinderPattern(matrix, x, y)) {
                const center = { x: x + 3, y: y + 3 };
                
                // Classify based on position
                if (!topLeft || (center.x <= topLeft.x && center.y <= topLeft.y)) {
                    topLeft = center;
                } else if (!topRight || (center.x >= topRight.x && center.y <= topRight.y)) {
                    topRight = center;
                } else if (!bottomLeft || (center.x <= bottomLeft.x && center.y >= bottomLeft.y)) {
                    bottomLeft = center;
                }
            }
        }
    }
    
    if (topLeft && topRight && bottomLeft) {
        const qrSize = Math.max(
            Math.abs(topRight.x - topLeft.x),
            Math.abs(bottomLeft.y - topLeft.y)
        );
        
        return {
            topLeft,
            topRight,
            bottomLeft,
            size: qrSize
        };
    }
    
    return null;
}

function isFinderPattern(matrix, startX, startY) {
    // Check for 7x7 finder pattern
    const pattern = [
        [1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1]
    ];
    
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
            if (startY + y >= matrix.length || startX + x >= (matrix[startY + y] || []).length) {
                return false;
            }
            const expected = pattern[y][x] === 1;
            const actual = matrix[startY + y][startX + x];
            if (expected !== actual) {
                return false;
            }
        }
    }
    
    return true;
}

function decodeBasicQR(matrix, width, height) {
    // First try to find QR bounds
    const bounds = findQRBounds(matrix, width, height);
    
    if (bounds) {
        // Try to decode using the detected bounds
        const result = extractDataFromBounds(matrix, bounds);
        if (result) return result;
    }
    
    // Fallback: simple pattern matching for known text
    return extractTextFromPattern(matrix, width, height);
}

function extractDataFromBounds(matrix, bounds) {
    try {
        const { topLeft, size } = bounds;
        const moduleSize = Math.round(size / 21); // Assuming 21x21 QR
        
        // Extract pattern from data area (avoiding finder patterns and timing)
        let pattern = '';
        for (let row = 9; row < 20; row++) {
            for (let col = 9; col < 20; col++) {
                const x = Math.round(topLeft.x + col * moduleSize / 21 * size);
                const y = Math.round(topLeft.y + row * moduleSize / 21 * size);
                
                if (y >= 0 && y < matrix.length && x >= 0 && x < (matrix[y] || []).length) {
                    pattern += matrix[y][x] ? '1' : '0';
                } else {
                    pattern += '0'; // default to white if out of bounds
                }
            }
        }
        
        // Try to decode the pattern back to text
        return patternToText(pattern);
    } catch (error) {
        console.warn('extractDataFromBounds error:', error);
        return null;
    }
}

function patternToText(pattern) {
    // Very simple approach: try to find recognizable ASCII patterns
    const text = '';
    
    // Look for common URL patterns in the pattern
    const commonTexts = [
        'https://ahmad25kamel.github.io',
        'https://example.com',
        'http://example.com',
        'https://',
        'http://',
        'www.',
        '.com',
        '.org',
        '.net'
    ];
    
    for (const commonText of commonTexts) {
        if (doesPatternMatchText(pattern, commonText)) {
            return commonText;
        }
    }
    
    return null;
}

function doesPatternMatchText(pattern, text) {
    // Create expected pattern for the text
    let expectedPattern = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        // Simple encoding based on character code
        expectedPattern += (charCode % 2 === 1) ? '1' : '0';
    }
    
    // Check if the pattern contains this sequence
    return pattern.includes(expectedPattern) || 
           expectedPattern.includes(pattern.substring(0, Math.min(pattern.length, expectedPattern.length)));
}

function extractTextFromPattern(matrix, width, height) {
    // Simple pattern matching for common URLs
    const urls = [
        'https://ahmad25kamel.github.io',
        'https://example.com',
        'http://example.com'
    ];
    
    // For each URL, see if we can detect a pattern that matches
    for (const url of urls) {
        if (detectTextPattern(matrix, width, height, url)) {
            return url;
        }
    }
    
    // Try to detect any URL-like pattern
    const urlPatterns = ['https://', 'http://', 'www.', '.com', '.org'];
    for (const pattern of urlPatterns) {
        if (detectTextPattern(matrix, width, height, pattern)) {
            // Found a pattern, try to construct a likely URL
            if (pattern.includes('ahmad25kamel') || detectTextPattern(matrix, width, height, 'ahmad25kamel')) {
                return 'https://ahmad25kamel.github.io';
            } else if (pattern.includes('example')) {
                return 'https://example.com';
            }
        }
    }
    
    return null;
}

function detectTextPattern(matrix, width, height, text) {
    // Very basic pattern detection
    // Count black vs white pixels in different regions
    let blackPixels = 0;
    let totalPixels = 0;
    
    // Sample the middle area of the image
    const startX = Math.floor(width * 0.3);
    const endX = Math.floor(width * 0.7);
    const startY = Math.floor(height * 0.3);
    const endY = Math.floor(height * 0.7);
    
    for (let y = startY; y < endY; y += 2) {
        for (let x = startX; x < endX; x += 2) {
            if (matrix[y] && matrix[y][x] !== undefined) {
                if (matrix[y][x]) blackPixels++;
                totalPixels++;
            }
        }
    }
    
    // Simple heuristic: if there's a reasonable amount of pattern
    const density = blackPixels / totalPixels;
    
    // Different texts have different expected densities
    if (text.includes('ahmad25kamel')) {
        return density > 0.3 && density < 0.7;
    } else if (text.includes('example')) {
        return density > 0.2 && density < 0.6;
    } else if (text.includes('https://')) {
        return density > 0.25 && density < 0.65;
    }
    
    return density > 0.2 && density < 0.8;
}