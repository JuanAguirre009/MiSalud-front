import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import styles from './CardSearch.module.css';
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMiSaludStore } from "../../../zustand/miSaludStore.js";
import iconAdministracion from "../../../assets/images/administracion.png";
import {modalMessage} from "../../../helpers/modal-alert/modalAlert.js";
export default function CardSearch() {
  const navigate = useNavigate();
  const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5256/api/Patient/GetPatientByCedula/" + data.cc);
      
      if (!response.ok) {
        modalMessage("¡Paciente no encontrado!");
        return;
      } 
      navigate(`/InfoPatient/${data.cc}`);
    }catch (errors) {
      console.error("Error fetching data:", errors.message);
      modalMessage("¡Error al buscar el paciente! intente más tarde.");
    }
  }

  useEffect(() => {
    setCardTitle({
      infoCard: {
        title: "Administración",
        subtitle: "Gestionar Agenda",
        icon: iconAdministracion,
        bgColor: "transparent",
      },
    });
  }, []);

  return (
    <form className={styles["card__search"]} onSubmit={ handleSubmit(onSubmit)} >
      <div className={styles["card__search--container"]}>
        <p className={styles["serch__container--title"]}>Digite la Cedula</p>
          <TextField
            sx={{
              width: "90%",
              '& .MuiInputBase-input': {
                color: "#4D7B80",
                fontFamily: "Raleway",
              },
              '& .MuiInputLabel-root': {
                color: "#28BBC9",
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: "#28BBC9", 
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: "#28BBC9",
                borderWidth: 2,
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: "#28BBC9", 
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: "#4D7B80", 
              },
            }}
            required
            label="CC"
            {...register("cc",{
              required: "La cedula es obligatoria",
              pattern: {
                value: /^[0-9]+$/,
                message: "Solo se permiten números",
              },})}
            error={errors.cc}
            helperText={errors.cc?.message }
          />
      </div>
          <button  className={styles["card__search--button"]} id="BtnSubmit" type="submit">Buscar Paciente</button>
    </form>
  );
}