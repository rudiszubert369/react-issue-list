import { useSpring, animated } from 'react-spring';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 500,
  });

  const taglineAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 1000,
  });

  return (
      <HelmetProvider>
        <ThemeProvider theme={themeMode}>
          <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;900&display=swap" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="description"
            content="IssueMaster - An application for creating and managing issues to increase productivity and get things done. Empower yourself to achieve your goals with ease."
          />
          <title>IssueMaster</title>
          </Helmet>
          <GlobalStyles />
          <Header>
            <Toggle theme={theme} toggleTheme={themeToggler} />
            <Title style={titleAnimation}>IssueMaster</Title>
            <Tagline style={taglineAnimation}>Empowering productivity, one issue at a time</Tagline>
          </Header>
          <main>{children}</main>
        </ThemeProvider>
      </HelmetProvider>
  );
};

Toggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired
};

export default Layout;
