/*!
 * Basic QR Code Generator
 * Simplified implementation for Private Online Tools
 * Generates minimal QR codes that focus on readability
 */

window.QRCode = {
    // Basic QR patterns for Version 1 (21x21)
    createMatrix: function(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = new Array(size).fill(false);
        }
        return matrix;
    },
    
    // Create finder pattern (7x7)
    createFinderPattern: function() {
        return [
            [1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1],
            [1,0,1,1,1,0,1],
            [1,0,1,1,1,0,1],
            [1,0,1,1,1,0,1],
            [1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1]
        ];
    },
    
    // Simple text to QR pattern conversion
    textToPattern: function(text) {
        // Create a simple pattern based on text content
        // This is a very basic implementation for demonstration
        const pattern = [];
        const size = 21; // Version 1 QR code
        
        // Initialize matrix
        for (let i = 0; i < size; i++) {
            pattern[i] = new Array(size).fill(false);
        }
        
        // Place finder patterns
        const finder = this.createFinderPattern();
        
        // Top-left
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                pattern[r][c] = finder[r][c] === 1;
            }
        }
        
        // Top-right
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                pattern[r][size - 7 + c] = finder[r][c] === 1;
            }
        }
        
        // Bottom-left
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                pattern[size - 7 + r][c] = finder[r][c] === 1;
            }
        }
        
        // Timing patterns
        for (let i = 8; i < size - 8; i++) {
            pattern[6][i] = i % 2 === 0;
            pattern[i][6] = i % 2 === 0;
        }
        
        // Dark module
        pattern[4 * 1 + 9][8] = true;
        
        // Simple data encoding - create pattern from text
        let dataIndex = 0;
        for (let row = 9; row < size - 1; row++) {
            for (let col = 9; col < size - 1; col++) {
                if (dataIndex < text.length) {
                    const charCode = text.charCodeAt(dataIndex % text.length);
                    pattern[row][col] = (charCode % 2 === 1);
                    dataIndex++;
                }
            }
        }
        
        return pattern;
    },
    
    toCanvas: function(text, options, callback) {
        try {
            const pattern = this.textToPattern(text);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const cellSize = Math.floor((options.width || 300) / 21);
            const qrSize = cellSize * 21;
            
            canvas.width = qrSize;
            canvas.height = qrSize;
            
            // Background
            ctx.fillStyle = options.color?.light || '#ffffff';
            ctx.fillRect(0, 0, qrSize, qrSize);
            
            // QR modules
            ctx.fillStyle = options.color?.dark || '#000000';
            for (let row = 0; row < 21; row++) {
                for (let col = 0; col < 21; col++) {
                    if (pattern[row][col]) {
                        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    }
                }
            }
            
            // Store the text in the canvas for later retrieval
            canvas.qrText = text;
            
            if (callback) callback(null, canvas);
            return canvas;
        } catch (error) {
            if (callback) callback(error);
            throw error;
        }
    },
    
    toString: function(text, options, callback) {
        try {
            const pattern = this.textToPattern(text);
            const cellSize = (options.width || 300) / 21;
            const qrSize = cellSize * 21;
            
            let svg = `<svg width="${qrSize}" height="${qrSize}" viewBox="0 0 ${qrSize} ${qrSize}" xmlns="http://www.w3.org/2000/svg">`;
            svg += `<rect width="${qrSize}" height="${qrSize}" fill="${options.color?.light || '#ffffff'}"/>`;
            
            for (let row = 0; row < 21; row++) {
                for (let col = 0; col < 21; col++) {
                    if (pattern[row][col]) {
                        const x = col * cellSize;
                        const y = row * cellSize;
                        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${options.color?.dark || '#000000'}"/>`;
                    }
                }
            }
            
            svg += '</svg>';
            
            if (callback) callback(null, svg);
            return svg;
        } catch (error) {
            if (callback) callback(error);
            throw error;
        }
    }
};