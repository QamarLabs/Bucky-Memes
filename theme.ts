import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const customTheme: ThemeConfig = extendTheme({
  fonts: {
    heading: `"Roboto Flex", sans-serif;`,
    body: `"Roboto Flex", sans-serif;`,
  },
  colors: {
    buttonText: "#ffffff",
    buckyGoldOne: "#F3CE04",
    buckyGoldTwo: "#FFA500",
    buckyBoxShadow: "rgba(255, 165, 0, 0.75)",
    bg: "rgb(12, 12, 12)",
    errorBg: "#E53E3E", // Adding error background color
    errorHoverBg: "#C53030", // Adding error hover background color
  },
  components: {
    // You can extend or override default component styles here
    Button: {
      // Extend the default Button component styles
      baseStyle: {
        fontWeight: "bold",
        color: "buttonText",
        _hover: {
          boxShadow: "0 4px 8px buckyBoxShadow",
        },
      },
      variants: {
        solid: {
          bg: "buckyGoldOne",
          _hover: {
            bg: "buckyGoldTwo",
          },
        },
        ghost: {
          bg: "transparent",
          color: "#333",
          _hover: {
            bg: "buckyGoldOne",
            color: "white",
          },
        },
        error: {
          bg: "errorBg",
          color: "white",
          _hover: {
            bg: "errorHoverBg",
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        fontWeight: "bold",
        color: "white",
        borderColor: "buckyGoldTwo",
        _hover: {
          boxShadow: "0 4px 8px buckyBoxShadow",
        },
      },
      variants: {
        ghost: {
          bg: "white",
          color: 'buckyGoldOne'
        },
        solid: {
          color: 'black',
          bg: "buckyGoldOne",
        },
      },
    },
  },
  Flex: {
    // Extend the default Button component styles
    baseStyle: {
      bgColor: '#333'
    },
  },
  Box: {
    // Extend the default Button component styles
    baseStyle: {
      bgColor: '#333'
    },
  }
  // Add other theme customizations like breakpoints, fonts, etc.
});

export default customTheme;
