import styles from "./espresso-machine.module.css";

function EspressoMachine() {
  return (
    <div className={styles.espressoMachine}>
      <div className={styles.machineBody}>
        <div className={styles.spout}></div>
      </div>
      <div className={styles.backgroundConnector}></div>
      <div className={styles.tray}></div>
      <div className={styles.base}></div>
      <div className={styles.coffee}></div>
      <div className={styles.cup}></div>
    </div>
  );
}

export default EspressoMachine;
