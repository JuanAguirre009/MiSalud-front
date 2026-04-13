
import styles from './ButtonGroup.module.css';
import { useNavigate } from 'react-router-dom';
export  default function ButtonGroup({ ccPatient }) {
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <div className={styles["button__group--container"]}>
            <button className={styles["group--container--button"]} onClick={()=>handleClick('/CreateAppointment/' + ccPatient)}>Agendar Cita</button>
            <button className={styles["group--container--button"]} onClick={() => handleClick('/ScheduleAppointment/' + ccPatient)}>Ver Agenda</button>
            <button className={styles["group--container--button"]} onClick={() => handleClick('/ManageAgenda')} >Regresar</button>
        </div>
    );
}