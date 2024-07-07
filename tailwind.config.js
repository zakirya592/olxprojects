/** @type {import('tailwindcss').Config} */
export default {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        smm: '440px',
        // => @media (min-width: 640px) { ... }

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 1024px) { ... }

        lg: '1024px',
        // => @media (min-width: 1280px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1280px) { ... }

        '3xl': '1760px'
        // => @media (min-width: 1280px) { ... }
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Oswald', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      },
      colors: {
        'primary': '#FF693A',
        'secondary': '#021F69',
        'border_color': '#8E9CAB',
      }
    }
  },
  plugins: [],
}

