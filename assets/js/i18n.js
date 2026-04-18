// Simple internationalization (i18n) system
// Supports multiple languages with automatic detection

window.i18n = {
    // Current language
    currentLang: 'en',
    
    // Translations
    translations: {
        en: {
            title: "Private Online Tools",
            subtitle: "100% Client-Side Privacy Tools",
            description: "All tools run 100% in your browser. No files are ever uploaded. Fast, private, and free.",
            backToTools: "← Back to Tools",
            support: "☕ Support",
            supportTitle: "Support This Project",
            supportDescription: "Help keep these tools free and improve them with your support!",
            close: "Close",
            qrCodeTools: "QR Code Tools",
            resizeImage: "Resize Image", 
            compressImage: "Compress Image",
            advancedSettings: "⚙️ Advanced Settings",
            hideAdvancedSettings: "🔼 Hide Advanced Settings",
            generate: "🏗️ Generate QR Code",
            privacyTitle: "🔒 Privacy & Security",
            noAds: "No Ads",
            completely_free: "Completely Free",
            lightning_fast: "Lightning Fast",
            privacy_100: "100% Private"
        },
        id: { // Indonesian
            title: "Alat Online Pribadi",
            subtitle: "Alat Privasi 100% Sisi Klien",
            description: "Semua alat berjalan 100% di browser Anda. Tidak ada file yang pernah diunggah. Cepat, pribadi, dan gratis.",
            backToTools: "← Kembali ke Alat",
            support: "☕ Dukung",
            supportTitle: "Dukung Proyek Ini",
            supportDescription: "Bantu menjaga alat-alat ini tetap gratis dan tingkatkan dengan dukungan Anda!",
            close: "Tutup",
            qrCodeTools: "Alat Kode QR",
            resizeImage: "Ubah Ukuran Gambar",
            compressImage: "Kompres Gambar",
            advancedSettings: "⚙️ Pengaturan Lanjutan",
            hideAdvancedSettings: "🔼 Sembunyikan Pengaturan Lanjutan",
            generate: "🏗️ Buat Kode QR",
            privacyTitle: "🔒 Privasi & Keamanan",
            noAds: "Tanpa Iklan",
            completely_free: "Sepenuhnya Gratis",
            lightning_fast: "Sangat Cepat",
            privacy_100: "100% Pribadi"
        },
        zh: { // Chinese
            title: "私人在线工具",
            subtitle: "100% 客户端隐私工具",
            description: "所有工具都在您的浏览器中100%运行。从不上传文件。快速、私密、免费。",
            backToTools: "← 返回工具",
            support: "☕ 支持",
            supportTitle: "支持此项目",
            supportDescription: "帮助保持这些工具免费并通过您的支持改进它们！",
            close: "关闭",
            qrCodeTools: "二维码工具",
            resizeImage: "调整图像大小",
            compressImage: "压缩图像",
            advancedSettings: "⚙️ 高级设置",
            hideAdvancedSettings: "🔼 隐藏高级设置",
            generate: "🏗️ 生成二维码",
            privacyTitle: "🔒 隐私与安全",
            noAds: "无广告",
            completely_free: "完全免费",
            lightning_fast: "闪电快速",
            privacy_100: "100% 私密"
        },
        ar: { // Arabic
            title: "أدوات خاصة على الإنترنت",
            subtitle: "أدوات خصوصية 100% من جانب العميل",
            description: "جميع الأدوات تعمل 100% في متصفحك. لا يتم رفع أي ملفات أبداً. سريع وخاص ومجاني.",
            backToTools: "← العودة للأدوات",
            support: "☕ الدعم",
            supportTitle: "ادعم هذا المشروع",
            supportDescription: "ساعد في إبقاء هذه الأدوات مجانية وتحسينها بدعمك!",
            close: "إغلاق",
            qrCodeTools: "أدوات رمز QR",
            resizeImage: "تغيير حجم الصورة",
            compressImage: "ضغط الصورة",
            advancedSettings: "⚙️ إعدادات متقدمة",
            hideAdvancedSettings: "🔼 إخفاء الإعدادات المتقدمة",
            generate: "🏗️ إنشاء رمز QR",
            privacyTitle: "🔒 الخصوصية والأمان",
            noAds: "بدون إعلانات",
            completely_free: "مجاني تماماً",
            lightning_fast: "سريع البرق",
            privacy_100: "100% خاص"
        },
        ja: { // Japanese
            title: "プライベートオンラインツール",
            subtitle: "100% クライアント側プライバシーツール",
            description: "すべてのツールはブラウザで100%動作します。ファイルがアップロードされることはありません。高速、プライベート、無料。",
            backToTools: "← ツールに戻る",
            support: "☕ サポート",
            supportTitle: "このプロジェクトをサポート",
            supportDescription: "これらのツールを無料に保ち、あなたのサポートで改善するのを助けてください！",
            close: "閉じる",
            qrCodeTools: "QRコードツール",
            resizeImage: "画像リサイズ",
            compressImage: "画像圧縮",
            advancedSettings: "⚙️ 詳細設定",
            hideAdvancedSettings: "🔼 詳細設定を隠す",
            generate: "🏗️ QRコード生成",
            privacyTitle: "🔒 プライバシーとセキュリティ",
            noAds: "広告なし",
            completely_free: "完全無料",
            lightning_fast: "超高速",
            privacy_100: "100% プライベート"
        }
    },
    
    // Initialize i18n
    init: function() {
        this.detectLanguage();
        this.applyTranslations();
    },
    
    // Detect user's preferred language
    detectLanguage: function() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        if (langParam && this.translations[langParam]) {
            this.currentLang = langParam;
            try { localStorage.setItem('preferred-language', langParam); } catch(e) {}
            return;
        }

        // Check localStorage
        let savedLang = null;
        try { savedLang = localStorage.getItem('preferred-language'); } catch(e) {}
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
            return;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.substring(0, 2);

        if (this.translations[langCode]) {
            this.currentLang = langCode;
            try { localStorage.setItem('preferred-language', langCode); } catch(e) {}
        }
    },
    
    // Get translation for a key
    t: function(key) {
        return this.translations[this.currentLang][key] || this.translations.en[key] || key;
    },
    
    // Apply translations to page
    applyTranslations: function() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation) {
                element.title = translation;
            }
        });
    },
    
    // Change language
    setLanguage: function(langCode) {
        if (this.translations[langCode]) {
            this.currentLang = langCode;
            try { localStorage.setItem('preferred-language', langCode); } catch(e) {}
            this.applyTranslations();
            
            // Update URL parameter
            const url = new URL(window.location);
            url.searchParams.set('lang', langCode);
            window.history.replaceState({}, '', url);
        }
    },
    
    // Create language selector
    createLanguageSelector: function() {
        const languages = [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
            { code: 'zh', name: '中文', flag: '🇨🇳' },
            { code: 'ar', name: 'العربية', flag: '🇸🇦' },
            { code: 'ja', name: '日本語', flag: '🇯🇵' }
        ];
        
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.innerHTML = `
            <button id="langToggle" class="flex items-center space-x-2 px-3 py-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
                <span id="currentFlag">${languages.find(l => l.code === this.currentLang)?.flag || '🇺🇸'}</span>
                <span class="text-sm">${languages.find(l => l.code === this.currentLang)?.code.toUpperCase() || 'EN'}</span>
            </button>
            <div id="langDropdown" class="absolute right-0 mt-2 bg-white rounded-lg shadow-lg hidden z-50 min-w-48">
                ${languages.map(lang => `
                    <button class="lang-option w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2" data-lang="${lang.code}">
                        <span>${lang.flag}</span>
                        <span class="text-sm">${lang.name}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        return selector;
    }
};

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.i18n.init());
} else {
    window.i18n.init();
}