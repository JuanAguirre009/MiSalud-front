import Swal from "sweetalert2";
import styles from "./modalAlert.module.css";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Modal simple de mensaje (info, success, error)
export async function modalMessage(titulo = "", mensaje = "", tipo = "",redirectUrl = null) {
  const result= await Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    confirmButtonText: "✔",
    confirmButtonColor: "#28BBC9",
    customClass: {
      popup: styles["swal__style"],
      confirmButton: styles["button__confirmar"],
      cancelButton: styles["button__cancelar"],
      title: styles["swal__title"],
      htmlContainer: styles["swal__content"],
    },
  });

  if (result.isConfirmed && redirectUrl) {
    window.location.href = redirectUrl;
  }

}

// ✅ Modal tipo select reutilizable
export async function modalSelect({ title, options, placeholder }) {
  const { value } = await Swal.fire({
    title,
    input: "select",
    inputOptions: options,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: "✔",
    confirmButtonColor: "#28BBC9",
    customClass: {
      popup: styles["swal__style"],
      confirmButton: styles["button__confirmar"],
      cancelButton: styles["button__cancelar"],
      title: styles["swal__title"],
      htmlContainer: styles["swal__content"],
    },
    didOpen: () => {
      const select = Swal.getInput();
      if (select) {
        select.style.color = "var(--color-dark-teal)";
        select.style.fontWeight = "bold";
      }
    },
  });
  return value;
}

// ✅ Modal de confirmación con HTML
export async function modalConfirm({ title, html }) {
  return await Swal.fire({
    title,
    html,
    showCancelButton: true,
    confirmButtonText: "Sí, agendar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#28BBC9",
    customClass: {
      popup: styles["swal__style"],
      confirmButton: styles["button__confirmar"],
      cancelButton: styles["button__cancelar"],
      title: styles["swal__title"],
      htmlContainer: styles["swal__content"],
    },
  });
}