import './grid.styles.css'

export const Grid = ({ children, className }) => (
    <div className={`grid ${className}`}>{children}</div>
  );