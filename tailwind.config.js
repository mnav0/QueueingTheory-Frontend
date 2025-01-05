module.exports = {
  theme: {
    extend: {
      colors: {
        "bidmc-blue-light": "#009edf",
        "bidmc-blue": "#007cc1",
        "bidmc-blue-dark": "#183e74",
        "transparent-gray": "rgba(0, 0, 0, 0.5)"
      }
    },
    customForms: theme => ({
      dark: {
        'input, textarea, multiselect, checkbox, radio': {
          backgroundColor: theme('colors.gray.900'),
          borderColor: theme('colors.gray.800')
        },
        select: {
          backgroundColor: theme('colors.gray.600'),
          borderColor: theme('colors.gray.800')
        },
      },
      sm: {
        'input, textarea, multiselect, select': {
          fontSize: theme('fontSize.sm'),
          padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
        },
        select: {
          paddingRight: `${theme('spacing.4')}`,
        },
        'checkbox, radio': {
          width: theme('spacing.3'),
          height: theme('spacing.3'),
        },
      }
    }),
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}