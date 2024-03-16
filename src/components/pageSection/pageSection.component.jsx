import "./pageSection.styles.css";

export const PageSection = ({
  children,
  wrapperClassName = "",
  containerClassName = "",
  wrapperId = "",
}) => {
  return (
    <div className={`section-wrapper ${wrapperClassName}`} id={wrapperId}>
      <div className={`section-container ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
};
