const Container = ({ width = 600, children }) => {
  return (
    <div
      style={{
        margin: '0 auto',
        padding: '0 10px',
        width: '100%',
        maxWidth: width,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
