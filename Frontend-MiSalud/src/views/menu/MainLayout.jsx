import { Outlet, useLocation } from "react-router-dom";
import CurrentUser from "../../components/current-user/CurrentUser";
import CardMenuBase from "../../components/cards/card-menu-base/CardMenuBase";
import CardTitle from "../../components/cards/card-title/CardTitle";
import CardSecondary from "../../components/cards/card-secondary/CardSecondary";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect } from "react";
import iconAdministracion from "../../assets/images/administracion.png";
import style from "./MainLayout.module.css";
import { useMiSaludStore } from "../../zustand/miSaludStore";
export default function MainLayout() {
  const location = useLocation();
  const path = location.pathname;
  const setCardTitle = useMiSaludStore((state) => state.setCardTitle);
  const cardTitle = useMiSaludStore((state) => state.cardTitle);

  useEffect(() => {
    if (path === "/") {
      setCardTitle({
        infoCard: {
          title: "Administración",
          subtitle: "",
          icon: iconAdministracion,
          bgColor: "transparent",
        },
      });
    }
  }, [path]);
  return (
    <>
      <CurrentUser />
      <CardMenuBase>
          <CardTitle title={cardTitle.title} subtitle={cardTitle.subtitle} icon={cardTitle.icon} />
          <div className={style["card__menubase--content"]}>
            <Sidebar />
            <CardSecondary bgColor={cardTitle.bgColor}>
              <Outlet />
            </CardSecondary>
          </div>
      </CardMenuBase>
    </>
  );
}
