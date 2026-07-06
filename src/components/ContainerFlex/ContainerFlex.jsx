import styles from './containerFlex.module.css';

const ContainerFlex = ({ width = 600, children }) => {
  return (
    <div
      className={styles.container}
      style={{
        maxWidth: width,
      }}
    >
      {children}
    </div>
  );
};

export default ContainerFlex;
