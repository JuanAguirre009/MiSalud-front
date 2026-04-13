import styles from "./ScheduleAppointment.module.css";
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import iconSchedule from "../../../assets/images/scheduleicon.png";
import { useMiSaludStore } from "../../../zustand/miSaludStore.js"
import getAppointmentByPatientCC from "../../../helpers/getAppointmentByPatientCC.js";
import getPatientByCC from "../../../helpers/getPatientByCC.js";
import CircularProgress from '@mui/material/CircularProgress';
import ScheduleEmpty from "../../../components/schedule-empty/ScheduleEmpty.jsx";
import AppointmentDetails from "../../../components/appointment/appointment-details/AppointmentDetails.jsx";
import AppointmentList from "../../../components/appointment/appointment-list/AppointmentList.jsx";
import AppointmentActions from "../../../components/appointment/appointment-actions/AppointmentActions.jsx";
import {modalMessage} from "../../../helpers/modal-alert/modalAlert.js";
export default function ScheduleAppointment() { 
    const {cc} = useParams();
    const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
    const [appointments, setAppointments] = useState(undefined);
    const [selectedAppointment, setSelectedAppointment] = useState(undefined);
    const [currentPatient, setCurrentPatient] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatient = async () => {
            const data = await getPatientByCC(cc);
            if (data === null) {
                setCurrentPatient(null);
                modalMessage("Ruta no encontrada.");
                navigate("/");
                return;
            }
            setCurrentPatient(data);
        };
        fetchPatient();
    },[cc]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAppointmentByPatientCC(cc);
            
            if (data === null) {
                setAppointments(null);
                return;
            }
            setAppointments(data);

        };

        fetchData();
    },[cc]);

    useEffect(() => {
        setCardTitle({
            infoCard: {
            title: "Agenda",
            subtitle: "",
            icon: iconSchedule,
            bgColor: "#EDECF4",
            },
        });
    }, []);


    if (currentPatient === undefined || currentPatient === null) {
        
        return <CircularProgress/>;
    }

    if (appointments === undefined ) {
        return <CircularProgress/>;
    }

    if (appointments === null ) {
        return <ScheduleEmpty/>;
    }

    return <div className={styles["schedule__appointment--container"]}>
        <div className={styles["schedule__appointment--list"]}>
            <AppointmentList appointments={appointments} onSelect={setSelectedAppointment} />
        </div>
        <div className={styles["schedule__appointment--details"]}>
             <AppointmentDetails idAppointment={selectedAppointment} />
             <div className={styles["appointment__details--actions"]}>
                <AppointmentActions idAppointment={selectedAppointment}  />
            </div>
        </div>
        
    </div>;
}