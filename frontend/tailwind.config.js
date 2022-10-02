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
        }
    },
    fontFamily: {
        'serif': ['"proxima-nova"', '"Helvetica Neue"', 'Helvetica', 'Arial', '"sans-serif"']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
