// tailwind.config.js
module.exports = {
//   mode: 'jit',
//   purge: [
//     './public/**/*.html',
//     './src/**/*.{js,jsx,ts,tsx,vue}',
//   ],
  purge: [],
  theme: {
    extend: {
        colors: {
            'feather-primary': '#8E8CED',
            'feather-border': '#8E8CEE',
            'feather-hover': 'rgb(164, 162, 241, 0.5)',
            'feather-dark':'#6160A2',
            'translucent': 'rgba(255, 255, 255, 0.2)'
        },
        keyframes: {
            'fade-in' : {
                '0%': {opacity: '0'},
                '100%': {opacity: '1'},
            }
        },
        animation: {
            'fade-in': 'fade-in 0.5s ease-in'
        },
    },
    fontFamily: {
        'serif': ['"proxima-nova"', '"Helvetica Neue"', 'Helvetica', 'Arial', '"sans-serif"']
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  variants: {
    extend: {
        button: ['disabled'],
        opacity: ['disabled'],
    },
  },
  plugins: [],
};
