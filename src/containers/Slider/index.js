import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // modif de l'ordre d'affichage en changeant evtA > evtB
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [index, byDateDesc]);
  // // console.log("byDateDesc :", byDateDesc);
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id ?? `fallback-${idx}`} className="SlideCardContainer">
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
                <input
                  key={`radio-${event.id ?? `fallback-${radioIdx}`}`} // si event.id est undefined, la key sera fallback-0, fallback-1, etc., évitant les doublons.
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
