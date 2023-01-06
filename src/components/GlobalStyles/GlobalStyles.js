import PropTypes from "prop-types";
import "./GlobalStyles.css";

function GlobalStyles({ children }) {
  return <>{children}</>;
}

GlobalStyles.propType = {
  children: PropTypes.element.isRequired,
};

export default GlobalStyles;
