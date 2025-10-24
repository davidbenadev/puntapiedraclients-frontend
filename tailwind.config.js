    // tailwind.config.js
    module.exports = {
      darkMode: 'class', // Enable class-based dark mode
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        // ... other paths
      ],
      theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                textPrimary: 'var(--color-text-primary)',
            },
        },
      },
      plugins: [],
    };