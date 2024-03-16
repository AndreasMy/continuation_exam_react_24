import './grid.styles.css'

export const GridItem = ({ children, className, span }) => (
    <div className={`grid-item ${span ? 'span-' + span : ''} ${className}`}>
      {children}
    </div>
  );