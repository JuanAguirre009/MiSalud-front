import styles from "./CardTitle.module.css";

export default function CardTitle({title, subtitle, icon}) {
  return (
    <div className={styles["card__title"]}>
        <div className={styles["card__title--text"]}>
            <p className={styles["title__text--principal"]}>{title}</p>
            <p className={styles["title__text--subtitle"]}>{subtitle}</p>
        </div>
        <div className={styles["card__title--div"]}>
            <img className={styles["title__div--icon"]} src={icon} alt="icon" />
        </div>
    </div>
  );
}