import { useSpring, animated } from 'react-spring';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/Theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import  { useDarkMode } from "../styles/useDarkMode";
import Toggle from "./Toggler";

const Layout = ({ children }) => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 500,
  });

  return (
      <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
        <Toggle theme={theme} toggleTheme={themeToggler} />
        <header>
          <animated.h1 style={titleProps}>Title</animated.h1>
        </header>
        <main>{children}</main>
      </ThemeProvider>
  );
};

export default Layout;
