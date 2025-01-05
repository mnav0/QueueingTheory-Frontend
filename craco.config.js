// See https://resir014.xyz/posts/2019/03/13/using-typescript-absolute-paths-in-cra-20/ for aliasing
const eslintConfig = require("./package.json").eslintConfig;

module.exports = {
  webpack: {
    alias: {
      "src": require("path").resolve(__dirname, "src") 
    }
  },
  eslint: {
    configure: eslintConfig
  },
  style: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('postcss-nested'),
        require("postcss-preset-env")
      ]
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^src(.*)$": "<rootDir>/src/$1"
      }
    }
  },
  babel: {
    plugins: [
      ["ramda", {"useES": true}]
    ]
  }
}