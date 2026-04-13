export function generateAllTimes() {
    const times = [];
    for (let hour = 8; hour < 17; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00:00`);
      times.push(`${hour.toString().padStart(2, "0")}:30:00`);
    }
    return times;
  }
 
  export function calcularHoraFinal(horaInicio) {
    const [h, m, s] = horaInicio.split(":").map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + 30);
    const finalHour = date.getHours().toString().padStart(2, "0");
    const finalMinutes = date.getMinutes().toString().padStart(2, "0");
    return `${finalHour}:${finalMinutes}:00`;
  }
 