module.exports = {
    theme: {
        extend: {
            colors: {
                gray: {
                    dark: '#4a707a',
                    medium: '#7697a0',
                    base: '#94b0b7',
                    light: '#c2c8c5',
                    white: '#f3f3f9',
                },
                maroon: '#2d3452',
            },
        },
    },
    variants: {},
    plugins: [],
    purge: {
        // Filenames to scan for classes
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
            './public/index.html',
        ],
    },
};
