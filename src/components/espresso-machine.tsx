import CloudIcon from "./cloud-icon";
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
      <div className={styles.cup}>
        <div className={styles.coffeeInside}></div>
        <div
          className={`${styles.smoke} bottom-[30px] flex flex-col items-center justify-center`}
        >
          <CloudIcon className={`${styles.smokeLine} h-4 w-8 fill-amber-300`} />
          <CloudIcon className={`${styles.smokeLine} h-4 w-4 fill-amber-400`} />
          <CloudIcon className={`${styles.smokeLine} h-2 w-3 fill-amber-400`} />
        </div>
      </div>
    </div>
  );
}

export default EspressoMachine;
