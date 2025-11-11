
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2563EB",
        secondary: "#1E293B",
        accent: "#F59E0B",
        lightBg: "#F9FAFB",
        neutral: "#64748B",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        learnifytheme: {
          primary: "#2563EB",
          secondary: "#1E293B",
          accent: "#F59E0B",
          neutral: "#64748B",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      "light", // fallback
      "dark",
    ],
  },
};
