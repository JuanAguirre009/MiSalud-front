import { useNavigate } from "react-router-dom";
import styles from './CardGroupButton.module.css';
import CardButton from '../card-button/CardButton';
import administracionIcon from '../../../assets/images/administracion.png';
export default function CardGroupButton() {
const navigate = useNavigate();

  return (
    <div className={styles["card__groupbutton"]}>
        <CardButton text="Crear Notificaciones" icon={administracionIcon} onClick={()=>(navigate("/CreateNotification"))}/>
        <CardButton text="Gestionar Agenda" icon={administracionIcon} onClick={()=>(navigate("/ManageAgenda"))} />
        <CardButton text="Crear Paciente" icon={administracionIcon} onClick={()=>(navigate("/CreatePatient"))}/>
    </div>
  );
}