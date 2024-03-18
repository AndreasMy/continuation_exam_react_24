import './button.styles.css'

export const Button = ({ children, onClick, className = '' }) => {
    return (
      <button className={`${className}`} onClick={onClick}>
        {children}
      </button>
    );
  };