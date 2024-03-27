import "./pageSection.styles.css";

export const PageSection = ({
  children,
  wrapperClassName = "",
  containerClassName = "",
  wrapperId = "",
  bannerContent = null,
  bannerProps = {},
  wrapperProps = {}, 
  containerProps = {}, 
  useInnerContainer = false,
}) => {
  const content = useInnerContainer ? (
    <div className="section-inner-container">{children}</div>
  ) : (
    children
  );
  return (
    <div
      id={wrapperId}
      className={`section-wrapper ${wrapperClassName}`}
      {...wrapperProps}
    >
      {bannerContent && (
        <div className="section-banner" {...bannerProps}>
          {bannerContent}
        </div>
      )}
      <div
        className={`section-container ${containerClassName}`}
        {...containerProps}
      >
        {content}
      </div>
    </div>
  );
};
