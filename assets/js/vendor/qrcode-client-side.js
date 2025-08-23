/*!
 * Client-side QR Code generator
 * Privacy-focused implementation for Private Online Tools
 * Based on QR Code specification but simplified for basic functionality
 */

(function() {
    'use strict';
    
    // QR Code constants
    const QR_VERSION = 1;
    const QR_SIZE = 21;
    const ERROR_CORRECTION_LEVELS = { L: 1, M: 0, Q: 3, H: 2 };
    
    class QRMatrix {
        constructor(size = QR_SIZE) {
            this.size = size;
            this.modules = [];
            this.reserved = [];
            this.init();
        }
        
        init() {
            // Initialize modules and reserved arrays
            for (let i = 0; i < this.size; i++) {
                this.modules[i] = new Array(this.size).fill(false);
                this.reserved[i] = new Array(this.size).fill(false);
            }
        }
        
        setModule(row, col, value) {
            if (this.isValid(row, col)) {
                this.modules[row][col] = value;
            }
        }
        
        getModule(row, col) {
            return this.isValid(row, col) ? this.modules[row][col] : false;
        }
        
        setReserved(row, col) {
            if (this.isValid(row, col)) {
                this.reserved[row][col] = true;
            }
        }
        
        isReserved(row, col) {
            return this.isValid(row, col) ? this.reserved[row][col] : true;
        }
        
        isValid(row, col) {
            return row >= 0 && row < this.size && col >= 0 && col < this.size;
        }
    }
    
    class QRCodeGenerator {
        constructor() {
            this.matrix = null;
        }
        
        generate(data, errorLevel = 'M') {
            this.matrix = new QRMatrix();
            
            // Step 1: Add function patterns
            this.addFinderPatterns();
            this.addTimingPatterns();
            this.addDarkModule();
            
            // Step 2: Encode and place data
            this.placeData(data);
            
            return this.matrix;
        }
        
        addFinderPatterns() {
            const pattern = [
                [1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1],
                [1,0,1,1,1,0,1],
                [1,0,1,1,1,0,1],
                [1,0,1,1,1,0,1],
                [1,0,0,0,0,0,1],
                [1,1,1,1,1,1,1]
            ];
            
            // Place finder patterns at corners
            this.placePattern(pattern, 0, 0);
            this.placePattern(pattern, 0, this.matrix.size - 7);
            this.placePattern(pattern, this.matrix.size - 7, 0);
            
            // Add separators (white borders around finder patterns)
            this.addSeparators();
        }
        
        placePattern(pattern, startRow, startCol) {
            for (let r = 0; r < pattern.length; r++) {
                for (let c = 0; c < pattern[r].length; c++) {
                    const row = startRow + r;
                    const col = startCol + c;
                    this.matrix.setModule(row, col, pattern[r][c] === 1);
                    this.matrix.setReserved(row, col);
                }
            }
        }
        
        addSeparators() {
            // Add white separators around finder patterns
            for (let i = 0; i < 8; i++) {
                // Top-left separator
                this.matrix.setReserved(7, i);
                this.matrix.setReserved(i, 7);
                
                // Top-right separator
                this.matrix.setReserved(7, this.matrix.size - 1 - i);
                this.matrix.setReserved(i, this.matrix.size - 8);
                
                // Bottom-left separator
                this.matrix.setReserved(this.matrix.size - 8, i);
                this.matrix.setReserved(this.matrix.size - 1 - i, 7);
            }
        }
        
        addTimingPatterns() {
            // Horizontal timing pattern
            for (let col = 8; col < this.matrix.size - 8; col++) {
                const isDark = (col % 2) === 0;
                this.matrix.setModule(6, col, isDark);
                this.matrix.setReserved(6, col);
            }
            
            // Vertical timing pattern
            for (let row = 8; row < this.matrix.size - 8; row++) {
                const isDark = (row % 2) === 0;
                this.matrix.setModule(row, 6, isDark);
                this.matrix.setReserved(row, 6);
            }
        }
        
        addDarkModule() {
            // Dark module (always placed at (4*version + 9, 8))
            const row = 4 * QR_VERSION + 9;
            this.matrix.setModule(row, 8, true);
            this.matrix.setReserved(row, 8);
        }
        
        placeData(data) {
            // Convert data to binary
            const binaryData = this.encodeData(data);
            
            // Place data using zigzag pattern
            let bitIndex = 0;
            let upward = true;
            
            for (let col = this.matrix.size - 1; col > 0; col -= 2) {
                if (col === 6) col--; // Skip timing column
                
                for (let vert = 0; vert < this.matrix.size; vert++) {
                    const row = upward ? this.matrix.size - 1 - vert : vert;
                    
                    for (let horizontal = 0; horizontal < 2; horizontal++) {
                        const c = col - horizontal;
                        
                        if (!this.matrix.isReserved(row, c)) {
                            let bit = false;
                            if (bitIndex < binaryData.length) {
                                bit = binaryData[bitIndex] === '1';
                                bitIndex++;
                            }
                            this.matrix.setModule(row, c, bit);
                        }
                    }
                }
                upward = !upward;
            }
        }
        
        encodeData(data) {
            // Simple byte mode encoding
            let binary = '';
            
            // Mode indicator (4 bits) - byte mode = 0100
            binary += '0100';
            
            // Character count (8 bits for version 1)
            const length = Math.min(data.length, 17); // Max for version 1
            binary += length.toString(2).padStart(8, '0');
            
            // Data
            for (let i = 0; i < length; i++) {
                binary += data.charCodeAt(i).toString(2).padStart(8, '0');
            }
            
            // Terminator (up to 4 bits)
            const maxBits = 152; // Max data bits for version 1, level M
            const remainingBits = maxBits - binary.length;
            binary += '0000'.substring(0, Math.min(4, remainingBits));
            
            // Pad to byte boundary
            while (binary.length % 8 !== 0) {
                binary += '0';
            }
            
            // Pad bytes
            const padBytes = ['11101100', '00010001'];
            let padIndex = 0;
            while (binary.length < maxBits) {
                binary += padBytes[padIndex % 2];
                padIndex++;
            }
            
            return binary.substring(0, maxBits);
        }
        
        // Convert matrix to canvas
        toCanvas(data, options = {}, callback) {
            try {
                const matrix = this.generate(data, options.errorCorrectionLevel);
                const canvas = this.renderCanvas(matrix, options);
                callback(null, canvas);
            } catch (error) {
                callback(error);
            }
        }
        
        // Convert matrix to SVG
        toString(data, options = {}, callback) {
            try {
                const matrix = this.generate(data, options.errorCorrectionLevel);
                const svg = this.renderSVG(matrix, options);
                callback(null, svg);
            } catch (error) {
                callback(error);
            }
        }
        
        renderCanvas(matrix, options) {
            const size = options.width || options.height || 300;
            const moduleSize = size / matrix.size;
            const darkColor = options.color?.dark || '#000000';
            const lightColor = options.color?.light || '#ffffff';
            
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            // Background
            ctx.fillStyle = lightColor;
            ctx.fillRect(0, 0, size, size);
            
            // Modules
            ctx.fillStyle = darkColor;
            for (let row = 0; row < matrix.size; row++) {
                for (let col = 0; col < matrix.size; col++) {
                    if (matrix.getModule(row, col)) {
                        ctx.fillRect(
                            col * moduleSize,
                            row * moduleSize,
                            moduleSize,
                            moduleSize
                        );
                    }
                }
            }
            
            return canvas;
        }
        
        renderSVG(matrix, options) {
            const size = options.width || options.height || 300;
            const moduleSize = size / matrix.size;
            const darkColor = options.color?.dark || '#000000';
            const lightColor = options.color?.light || '#ffffff';
            
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
            svg += `<rect width="${size}" height="${size}" fill="${lightColor}"/>`;
            
            for (let row = 0; row < matrix.size; row++) {
                for (let col = 0; col < matrix.size; col++) {
                    if (matrix.getModule(row, col)) {
                        const x = col * moduleSize;
                        const y = row * moduleSize;
                        svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="${darkColor}"/>`;
                    }
                }
            }
            
            svg += '</svg>';
            return svg;
        }
    }
    
    // Export as global QRCode object compatible with qrcode.js
    window.QRCode = new QRCodeGenerator();
    
})();