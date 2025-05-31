import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1E3A8A',
        'royal-blue': '#2563EB',
        'sky-blue': '#3B82F6',
        'light-blue': '#60A5FA',
        'dark-gray': '#1F2937',
        'medium-gray': '#374151',
        'light-gray': '#4B5563',
        background: '#1F2937',
        foreground: '#F3F4F6',
        primary: {
          DEFAULT: '#2563EB',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#374151',
          foreground: '#F3F4F6',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#4B5563',
          foreground: '#F3F4F6',
        },
        accent: {
          DEFAULT: '#60A5FA',
          foreground: '#FFFFFF',
        },
        input: '#374151',
      },
    },
  },
  plugins: [],
};

export default config; 