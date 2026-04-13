import styles from './CardMenuBase.module.css';
import {useMiSaludStore} from '../../../zustand/miSaludStore.js';
export default function CardMenuBase({children}) {
  const setCardTitle = useMiSaludStore.getState().setCardTitle;
  
  return (
    <div className={styles["card__menu-base"]}>
      {children}
    </div>
  );
}