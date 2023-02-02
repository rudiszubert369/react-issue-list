import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/Theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import  { useDarkMode } from "../styles/useDarkMode";
import Toggle from "./Toggler";

const Title = styled(animated.h1)`
  font-size: 4rem;
  text-align: center;
`;

const Tagline = styled(animated.h2)`
  font-size: 2em;
  text-align: center;
`;

const Layout = ({ children }) => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 500,
  });

  const taglineProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 1000,
  });

  return (
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <header>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Title style={titleProps}>IssueMaster</Title>
          <Tagline style={taglineProps}>Empowering productivity, one issue at a time</Tagline>
        </header>
        <main>{children}</main>
      </ThemeProvider>
  );
};

export default Layout;
