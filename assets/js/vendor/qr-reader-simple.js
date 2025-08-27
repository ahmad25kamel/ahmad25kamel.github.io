/*!
 * Basic QR Code Reader - Honest Implementation
 * Returns null for unknown QR codes instead of fake hardcoded values
 * For Private Online Tools
 */

window.jsQR = function(imageData, width, height, options = {}) {
    try {
        // This is a placeholder QR reader that doesn't return fake data
        // For real validation, the QR codes need to be tested with external QR readers
        
        // Basic pattern detection to see if it looks like a QR code
        const matrix = imageToMatrix(imageData.data, width, height);
        const hasQRStructure = validateQRStructure(matrix, width, height);
        
        if (hasQRStructure) {
            // Return null - we can't decode but we can see it has QR structure
            // This prevents false positives from hardcoded returns
            return null;
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

function validateQRStructure(matrix, width, height) {
    // Check for finder patterns in corners
    let finderPatterns = 0;
    
    // Check top-left finder pattern
    if (checkFinderPattern(matrix, 0, 0, width, height)) {
        finderPatterns++;
    }
    
    // Check top-right finder pattern  
    if (width >= 7 && checkFinderPattern(matrix, 0, width - 7, width, height)) {
        finderPatterns++;
    }
    
    // Check bottom-left finder pattern
    if (height >= 7 && checkFinderPattern(matrix, height - 7, 0, width, height)) {
        finderPatterns++;
    }
    
    // Should have at least 2 finder patterns for a valid QR structure
    return finderPatterns >= 2;
}

function checkFinderPattern(matrix, startY, startX, width, height) {
    if (startY + 7 > height || startX + 7 > width) return false;
    
    // Expected 7x7 finder pattern
    const expected = [
        [1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1]
    ];
    
    let matches = 0;
    let total = 49; // 7x7
    
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
            if (matrix[startY + y] && matrix[startY + y][startX + x] !== undefined) {
                if (matrix[startY + y][startX + x] === Boolean(expected[y][x])) {
                    matches++;
                }
            }
        }
    }
    
    // Allow some tolerance for image quality issues
    return matches / total > 0.8;
}
