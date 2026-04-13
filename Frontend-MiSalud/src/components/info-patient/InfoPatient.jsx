import { useEffect,useState  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMiSaludStore } from "../../zustand/miSaludStore";
import styles from "./InfoPatient.module.css";
import DetailsPatient from "./details-patient/DetailsPatient";
import ButtonGroup from "./button-group/ButtonGroup";
import iconAdministracion from "../../assets/images/administracion.png";
import CircularProgress from '@mui/material/CircularProgress';
import getPatientByCC  from "../../helpers/getPatientByCC.js";
import {modalMessage} from "../../helpers/modal-alert/modalAlert.js";

export default function InfoPatient() {
    const [patient, setPatient] = useState(undefined);
    const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
    const navigate = useNavigate();
    const { cc } = useParams();
  
    useEffect(() => {
      async function fetchData() {
        const data = await getPatientByCC(cc);

        if (data) {
          setPatient(data);
        }

        if (data === null) {
            modalMessage("¡Paciente no encontrado!");
            setPatient(undefined);
            navigate("/ManageAgenda");
        }

      }
      setCardTitle({
        infoCard: {
          title: "Administración",
          subtitle: "Gestionar Agenda",
          icon: iconAdministracion,
          bgColor: "transparent",
        },
      });
      fetchData();
    }, [cc]);
  
    if (patient === undefined || patient === null) {
        
        return <CircularProgress/>;
    }

    return (
      <div className={styles["info__patient"]}>
        <DetailsPatient patient={patient} />
        <ButtonGroup ccPatient={patient.cedula} />
      </div>
    );
  }