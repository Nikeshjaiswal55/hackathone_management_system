export const Button = ({
  text,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button className={`btn btn-${variant} ${className} fs-14`} {...props}>
      {text}
    </button>
  );
};
