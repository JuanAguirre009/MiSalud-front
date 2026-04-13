import { useNavigate } from "react-router-dom";
import  styles from './Sidebar.module.css';
import NotificationIcon from "../../components/icons/NotificationIcon";
import MenuIcon from "../../components/icons/MenuIcon";
import SettingsIcon from "../../components/icons/SettingsIcon";
export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles["sidebar__container"]}>
        <div className={styles["sidebar__container--menu"]} onClick={()=>(navigate("/"))} >
            <MenuIcon className={styles["container__div--icon"]} ></MenuIcon>
        </div>
        <div className={styles["sidebar__container--notification"]}>
            <NotificationIcon className={styles["container__div--icon"]} ></NotificationIcon>
           
        </div>
        <div className={styles["sidebar__container--settings"]}>
            <SettingsIcon className={styles["container__div--icon"]} ></SettingsIcon>
        </div>
    </div>
  );
}