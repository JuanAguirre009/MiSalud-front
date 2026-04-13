import styles from "./DetailsPatient.module.css";


export default function DetailsPatient({ patient }) {  

    return (
        <div className={styles["details__patient--container"]}>
            <h1 className={styles["patient__container--title"]}>Informacion Basica</h1>
            <div className={styles["details__patient--content"]}>
                <div className={styles["patient__content--fullname"]}>
                    <p className={styles["patient__content--title"]}>Nombre Completo: </p>
                    <p className={styles["patient__content--content"]}>{patient.nombreCompleto} </p>
                </div>
                
                <div className={styles["patient__content--cedula"]}>
                    <p className={styles["patient__content--title"]}>Cedula: </p>
                    <p className={styles["patient__content--content"]}>{patient?.cedula}</p>
                </div>
                <div className={styles["patient__content--phone"]}>
                    <p className={styles["patient__content--title"]}>Telefono: </p>
                    <p className={styles["patient__content--content"]}>+57 {patient?.telefono}</p>
                </div>
                <div className={styles["patient__content--email"]}>
                    <p className={styles["patient__content--title"]}>Correo: </p>
                    <p className={styles["patient__content--content"]}>{patient?.correo}</p>
                </div>
                <div className={styles["patient__content--address"]}>
                    <p className={styles["patient__content--title"]}>Direccion: </p>
                    <p className={styles["patient__content--content"]}>{patient?.direccion}</p>
                </div>
            </div>
            
        </div>
    );
}