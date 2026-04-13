import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Container, Divider, Grid } from "@mui/material";
import { useMiSaludStore } from "../../zustand/miSaludStore.js";
import iconPaciente from "../../assets/images/patienticon.png";
import { modalMessage } from "../../helpers/modal-alert/modalAlert.js";
import { useNavigate } from "react-router-dom";

export default function FormPatient() {
  const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setCardTitle({
      infoCard: {
        title: "Paciente",
        subtitle: "Crear paciente",
        icon: iconPaciente,
        bgColor: "white",
      },
    });
  }, []);

  const onSubmit = async (data) => {
    const nombre = data.nombre.trim();
    const password =
      nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase() + "123!";

    const infoPatient = {
      idPaciente: 0,
      cedula: data.cedula.toString(),
      nombreCompleto: data.nombre + " " + data.apellido,
      direccion: data.direccion,
      telefono: data.telefono.toString(),
      correo: data.correo,
      passwordPatient: password,
    };

    try {
      const response = await fetch(
        `http://localhost:5256/api/Patient/ExistsByCedulaOrCorreo?cedula=${data.cedula}&correo=${data.correo}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (result.cedulaExiste) {
        modalMessage("¡Cédula ya registrada!", "La cédula ya está registrada. Por favor, ingrese otra.", "");
        return;
      }

      if (result.correoExiste) {
        modalMessage("¡Correo ya registrado!", "El correo ya está registrado. Por favor, ingrese otro.", "");
        return;
      }

      const registerResponse = await fetch("http://localhost:5256/api/Patient/AddPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoPatient),
      });

      if (registerResponse.ok) {
        modalMessage("Paciente creado con éxito", "El paciente se ha guardado correctamente.", "");
        navigate("/");
      } else {
        modalMessage("Error", "Error al guardar el paciente.", "error");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      modalMessage("Error de conexión", "Ocurrió un error al conectar con el servidor.", "");
    }
  };

  const inputsDefault = {
    width: "100%",
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
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}
    >
      <Box sx={{ width: "100%", maxWidth: "650px", mx: "auto", px: 2, py: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#28BBC9",
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
          }}
        >
          Datos del Paciente
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
                width: "100%",
              }}
            >
              <Box sx={{ gridColumn: "span 1" }}>
                <TextField
                  label="Nombre"
                  fullWidth
                  sx={inputsDefault}
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <TextField
                  label="Apellido"
                  fullWidth
                  sx={inputsDefault}
                  {...register("apellido", { required: "El apellido es obligatorio" })}
                  error={!!errors.apellido}
                  helperText={errors.apellido?.message}
                />
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <TextField
                  label="Cédula"
                  fullWidth
                  sx={inputsDefault}
                  {...register("cedula", {
                    required: "La cédula es obligatoria",
                    pattern: {
                      value: /^[0-9]{6,10}$/,
                      message: "Debe tener entre 6 y 10 dígitos",
                    },
                  })}
                  error={!!errors.cedula}
                  helperText={errors.cedula?.message}
                />
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <TextField
                  label="Correo electrónico"
                  fullWidth
                  sx={inputsDefault}
                  type="email"
                  {...register("correo", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Correo no válido",
                    },
                  })}
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
                />
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <TextField
                  label="Dirección"
                  fullWidth
                  sx={inputsDefault}
                  {...register("direccion", {
                    required: "La dirección es obligatoria",
                  })}
                  error={!!errors.direccion}
                  helperText={errors.direccion?.message}
                />
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  sx={inputsDefault}
                  {...register("telefono", {
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^[0-9]{7,10}$/,
                      message: "Debe tener entre 7 y 10 dígitos",
                    },
                  })}
                  error={!!errors.telefono}
                  helperText={errors.telefono?.message}
                />
              </Box>
            </Box>

            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 5,
                  py: 1.5,
                  backgroundColor: "#28BBC9",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#20a6b2",
                  },
                }}
              >
                GUARDAR
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
