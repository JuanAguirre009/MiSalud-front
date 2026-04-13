import styles from "./CurrentUser.module.css";
import avatar from "../../assets/images/administrador.png";
export default function CurrentUser() {
  return (
    <div className={styles["current__user"]}>
        <p className={styles["current__user--greeting"]}>👋🏻 Hola Admin!</p>
        <div className={styles["current__user--card"]}>
            <img className={styles["user__card--img"]} src={avatar} alt="" />
        </div>
    </div>
  );
}