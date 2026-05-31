const LimitedContainer = ({ children, maxWidth = 1040 }) => {
  return (
    <div
      style={{
        maxWidth: maxWidth,
        margin: '0 auto',
        width: '100%',
        padding: '0 20px',
      }}
    >
      {children}
    </div>
  );
};

export default LimitedContainer;
