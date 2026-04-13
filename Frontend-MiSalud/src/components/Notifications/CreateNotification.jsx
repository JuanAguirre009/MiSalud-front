import { useState, useEffect } from "react";
import "../../styles/notification.css";
import administrationIcon from "../../assets/images/administracion.png";
import { useMiSaludStore } from "../../zustand/miSaludStore.js";
import {modalMessage} from "../../helpers/modal-alert/modalAlert.js";

const CreateNotification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false); 



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description, target);
  
    if (!target) {
      modalMessage("ALERTA", "Por favor selecciona un destinatario", "");
      return;
    }
  
    setLoading(true);
  
    const endpointMap = {
      Pacientes: "SendEmailToPatients",
      Medicos: "SendEmailToDoctors",
      Admin: "SendEmailToAdmins",
    };
  
    const endpoint = endpointMap[target];
  
    const url = `http://localhost:5256/api/Notification/${endpoint}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
    });

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }
  
     modalMessage("Notificación enviada", "La notificación se ha enviado correctamente a los " + target , "");
  
      setTitle("");
      setDescription("");
      setTarget("");
    } catch (error) {
      console.error(error);
      modalMessage("Error", "No se pudo enviar la notificación : " + error , "");
    } finally {
      setLoading(false);
    }
  };




  const setCardTitle = useMiSaludStore((state) => state.setCardTitle);

  useEffect(() => {
    setCardTitle({
      infoCard: {
        title: "Notificación",
        subtitle: "Crear notificación",
        icon: administrationIcon,
        bgColor: "white",
      },
    });
  }, []);

  return (
    <div className="container-notification">
      <form className="notification-form" onSubmit={handleSubmit}>
        <div className="form-main">
          <label className="label" htmlFor="titulo">Título</label>
          <input
            className="input"
            id="titulo"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="label" htmlFor="descripcion">Descripción</label>
          <textarea
            className="textarea"
            id="descripcion"
            placeholder="Descripción"
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 250) {
                setDescription(e.target.value);
              }
            }}
            required
          />
        </div>

        <div className="form-side">
          <p className="message-who">¿Quién recibe la notificación?</p>
          <div className="role-buttons">
            {["Admin", "Medicos", "Pacientes"].map((role) => (
              <button
                key={role}
                type="button"
                className={target === role ? "selected" : ""}
                onClick={() => setTarget(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <p  className="text-xs text-gray-500 mt-4">
            {description.length} / 250 caracteres
          </p>

          <p className="text-xs text-gray-400 mt-2 italic">
            Recuerda que el mensaje debe ser claro, breve y fácil de entender.
          </p>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Enviando..." : "Enviar notificación"}
        </button>
      </form>
    </div>
  );
};

export default CreateNotification;
