export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1];

// date.getMonth() renvoie un index entre 0 (janvier) et 11 (décembre), comme MONTHS commence /1 (et non 0) il faut ajouter 1 pour obtenir le bon mois
