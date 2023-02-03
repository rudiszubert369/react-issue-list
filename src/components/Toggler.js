import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  margin-top: 50px;
  margin-left: 15px;
  }
  `;

const Toggle = ({ toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} >
          <FontAwesomeIcon
            icon={faMoon}
            style={{ fontSize: "2em" }}
          />
        </Button>
    );
};

Toggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired
};

export default Toggle;
