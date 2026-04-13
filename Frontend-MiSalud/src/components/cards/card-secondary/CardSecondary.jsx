import style from './CardSecondary.module.css';

export default function CardSecondary({ children, bgColor = "transparent" }) {
  return (
    <div className={style["card__secondary"]} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
}