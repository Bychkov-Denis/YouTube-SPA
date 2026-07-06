import styles from './limitedContainer.module.css';

const LimitedContainer = ({ children, maxWidth = 1040 }) => {
  return (
    <div
      className={styles.container}
      style={{
        maxWidth: maxWidth,
      }}
    >
      {children}
    </div>
  );
};

export default LimitedContainer;
