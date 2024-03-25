import './wrapper.styles.css'

export const Wrapper = ({
  className = "",
  children,
}) => {

  return <div className={`${className}`}>{children}</div>;
};
