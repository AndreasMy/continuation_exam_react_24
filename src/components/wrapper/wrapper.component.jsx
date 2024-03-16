import './wrapper.styles.css'

export const Wrapper = ({
  className = "",
  children,
  isContainer = false,
}) => {
  const classPrefix = isContainer ? "container" : "wrapper";
  return <div className={`${classPrefix} ${className}`}>{children}</div>;
};
