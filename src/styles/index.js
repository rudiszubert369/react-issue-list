import { createGlobalStyle } from "styled-components";

// Enable fonts
const fontLinkElement = document.createElement("link");
fontLinkElement.href =
  "https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700&display=swap";
fontLinkElement.rel = "stylesheet";
document.head.appendChild(fontLinkElement);

export const theme = {
  palette: [
    "#13182C", // bg
    "#171E3A", // card bg
    "#FFFFFF", // fg
    "#EE295C", // accent 1 pink
    "#FFD166", // accent 2 gold
    "#3459DC" //  accent 3 blue
  ]
};

//  Dem styles
export const GlobalStyle = createGlobalStyle`
   html, body {
     margin: 0;
     background-color: ${({ theme }) => theme.palette[0]};
     font-family: Montserrat, sans-serif;
     font-size: 16px;
     line-height: 1.6;
     color: ${({ theme }) => theme.palette[2]};
   }
`;


import React from "react";
import { render } from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "styles";

const AppStyled = styled.div`
  padding: 2rem;
`;

const App = () => {
  return <AppStyled>hello there</AppStyled>;
};

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  rootElement
);
