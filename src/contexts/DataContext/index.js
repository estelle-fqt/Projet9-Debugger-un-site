import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); // Ajout d'un state pour 'last'

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();

      setData(loadedData);

      // Calculer la dernière prestation
      const sortedEvents = loadedData.events
        .map((event) => ({ ...event, date: new Date(event.date) })) // Convertir en date
        .sort((a, b) => b.date - a.date); // Trier du plus récent au plus ancien

      setLast(sortedEvents[0]); // Dernière prestation
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]);

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // ajout de last dans le contexte
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
