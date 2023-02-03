import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/Theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import  { useDarkMode } from "../styles/useDarkMode";
import Toggle from "./Toggler";

const Title = styled(animated.h1)`
  font-size: 4rem;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

const Tagline = styled(animated.h2)`
  font-size: 2em;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Header = styled.header`
  max-width: 75%;
  margin: 0 auto;
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
        <Header>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Title style={titleProps}>IssueMaster</Title>
          <Tagline style={taglineProps}>Empowering productivity, one issue at a time</Tagline>
        </Header>
        <main>{children}</main>
      </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
