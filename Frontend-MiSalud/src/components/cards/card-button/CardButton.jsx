import styles from './CardButton.module.css';

export default function CardButton({ text, icon,onClick  }) {
  return (
    <div  className={styles["card__button"]}
    onClick={onClick}
    role="button"
    tabIndex={0}>
        <p className={styles["card__button--text"]}>{text}</p>
        <div className={styles["card__button--container"]}>
            <img className={styles["button__container--icon"]} src={icon} alt={text} />
        </div>
    </div>
  );
}