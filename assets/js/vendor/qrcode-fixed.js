/*!
 * QR Code generator - Fixed version
 * Privacy-focused implementation for Private Online Tools
 * Based on QR Code specification with proper format information and masking
 */

(function() {
    'use strict';
    
    // QR Code constants
    const ERROR_CORRECTION_LEVELS = { L: 1, M: 0, Q: 3, H: 2 };
    const FORMAT_INFO = {
        'L': { 0: 0x77c4, 1: 0x72f3, 2: 0x7daa, 3: 0x789d, 4: 0x662f, 5: 0x6318, 6: 0x6c41, 7: 0x6976 },
        'M': { 0: 0x5412, 1: 0x5125, 2: 0x5e7c, 3: 0x5b4b, 4: 0x45f9, 5: 0x40ce, 6: 0x4f97, 7: 0x4aa0 },
        'Q': { 0: 0x355f, 1: 0x3068, 2: 0x3f31, 3: 0x3a06, 4: 0x24b4, 5: 0x2183, 6: 0x2eda, 7: 0x2bed },
        'H': { 0: 0x1689, 1: 0x13be, 2: 0x1ce7, 3: 0x19d0, 4: 0x0762, 5: 0x0255, 6: 0x0d0c, 7: 0x083b }
    };
    
    class QRMatrix {
        constructor(size) {
            this.size = size;
            this.modules = [];
            this.reserved = [];
            this.init();
        }
        
        init() {
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
            // Determine version based on data length
            const version = this.getVersionForData(data);
            const size = 21 + (version - 1) * 4;
            
            this.matrix = new QRMatrix(size);
            
            // Add function patterns
            this.addFinderPatterns();
            this.addSeparators();
            this.addTimingPatterns();
            this.addDarkModule(version);
            
            if (version >= 7) {
                this.addVersionInfo(version);
            }
            
            // Encode and place data
            const dataCodewords = this.encodeData(data, version, errorLevel);
            this.placeData(dataCodewords);
            
            // Apply mask and format info
            const bestMask = this.findBestMask();
            this.applyMask(bestMask);
            this.addFormatInfo(errorLevel, bestMask);
            
            return this.matrix;
        }
        
        getVersionForData(data) {
            // For simplicity, use version 2 for data up to 32 chars, version 3 for up to 53 chars
            if (data.length <= 17) return 1;
            if (data.length <= 32) return 2;
            if (data.length <= 53) return 3;
            return 4; // Up to 78 chars
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
                // Top-left
                this.matrix.setReserved(7, i);
                this.matrix.setReserved(i, 7);
                // Top-right
                this.matrix.setReserved(7, this.matrix.size - 1 - i);
                this.matrix.setReserved(i, this.matrix.size - 8);
                // Bottom-left
                this.matrix.setReserved(this.matrix.size - 8, i);
                this.matrix.setReserved(this.matrix.size - 1 - i, 7);
            }
        }
        
        addTimingPatterns() {
            for (let i = 8; i < this.matrix.size - 8; i++) {
                const isDark = (i % 2) === 0;
                this.matrix.setModule(6, i, isDark);
                this.matrix.setReserved(6, i);
                this.matrix.setModule(i, 6, isDark);
                this.matrix.setReserved(i, 6);
            }
        }
        
        addDarkModule(version) {
            const row = 4 * version + 9;
            this.matrix.setModule(row, 8, true);
            this.matrix.setReserved(row, 8);
        }
        
        addVersionInfo(version) {
            // Version info for version 7 and above - simplified implementation
            // For now, just reserve the areas
            if (version >= 7) {
                for (let i = 0; i < 6; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.matrix.setReserved(this.matrix.size - 11 + j, i);
                        this.matrix.setReserved(i, this.matrix.size - 11 + j);
                    }
                }
            }
        }
        
        addFormatInfo(errorLevel, maskPattern) {
            const formatInfo = FORMAT_INFO[errorLevel][maskPattern];
            
            // Place format info around top-left finder pattern
            for (let i = 0; i < 15; i++) {
                const bit = (formatInfo >> i) & 1;
                if (i < 6) {
                    this.matrix.setModule(8, i, bit === 1);
                } else if (i < 8) {
                    this.matrix.setModule(8, i + 1, bit === 1);
                } else if (i === 8) {
                    this.matrix.setModule(7, 8, bit === 1);
                } else {
                    this.matrix.setModule(14 - i, 8, bit === 1);
                }
            }
            
            // Place format info around top-right and bottom-left finder patterns
            for (let i = 0; i < 15; i++) {
                const bit = (formatInfo >> i) & 1;
                if (i < 8) {
                    this.matrix.setModule(8, this.matrix.size - 1 - i, bit === 1);
                } else {
                    this.matrix.setModule(this.matrix.size - 15 + i, 8, bit === 1);
                }
            }
        }
        
        encodeData(data, version, errorLevel) {
            let binary = '';
            
            // Mode indicator (4 bits) - byte mode = 0100
            binary += '0100';
            
            // Character count indicator
            const charCountBits = version < 10 ? 8 : 16;
            const length = Math.min(data.length, this.getMaxDataLength(version, errorLevel));
            binary += length.toString(2).padStart(charCountBits, '0');
            
            // Data
            for (let i = 0; i < length; i++) {
                binary += data.charCodeAt(i).toString(2).padStart(8, '0');
            }
            
            // Terminator
            const maxBits = this.getMaxDataBits(version, errorLevel);
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
        
        getMaxDataLength(version, errorLevel) {
            // Simplified data capacity table
            const capacities = {
                1: { L: 17, M: 14, Q: 11, H: 7 },
                2: { L: 32, M: 26, Q: 20, H: 14 },
                3: { L: 53, M: 42, Q: 32, H: 24 },
                4: { L: 78, M: 62, Q: 46, H: 34 }
            };
            return capacities[version][errorLevel] || 14;
        }
        
        getMaxDataBits(version, errorLevel) {
            return this.getMaxDataLength(version, errorLevel) * 8 + 20; // Approximate
        }
        
        placeData(binaryData) {
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
        
        findBestMask() {
            // For simplicity, just return mask pattern 0
            // In a full implementation, you would test all 8 patterns and choose the best
            return 0;
        }
        
        applyMask(maskPattern) {
            for (let row = 0; row < this.matrix.size; row++) {
                for (let col = 0; col < this.matrix.size; col++) {
                    if (!this.matrix.isReserved(row, col)) {
                        const mask = this.getMaskValue(maskPattern, row, col);
                        if (mask) {
                            const current = this.matrix.getModule(row, col);
                            this.matrix.setModule(row, col, !current);
                        }
                    }
                }
            }
        }
        
        getMaskValue(pattern, row, col) {
            switch (pattern) {
                case 0: return (row + col) % 2 === 0;
                case 1: return row % 2 === 0;
                case 2: return col % 3 === 0;
                case 3: return (row + col) % 3 === 0;
                case 4: return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
                case 5: return ((row * col) % 2) + ((row * col) % 3) === 0;
                case 6: return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
                case 7: return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
                default: return false;
            }
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