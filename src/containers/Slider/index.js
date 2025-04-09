import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // const byDateDesc = data?.focus.sort((evtA, evtB) = crée copie du tab
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 = modif ordre d'affichage
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setTimeout(
      // () => setIndex(index < byDateDesc.length ? index + 1 : 0) = ajout de -1 pour itérer que sur 3
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]);
  // ajout tab de dépendances pour mise à jr du slider

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ajout div SlideCardContainer pour key unique
        <div key={event.id ?? `fallback-${idx}`} className="SlideCardContainer">
          <div
            // key={event.title} = supprimé car key pas unique
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
                  // key={`${event.id}`} = suppr car key pas unique
                  key={`radio-${event.id ?? `fallback-${radioIdx}`}`} // si event.id est undefined, la key sera fallback-0, fallback-1 etc.. = évite les doublons
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
