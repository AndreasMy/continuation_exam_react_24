import "./heading.styles.css";

export const Heading = ({
  as: Component = "h3",
  className,
  children,
  ...props
}) => {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
