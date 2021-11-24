const getFilmById = (films, filmId) => {
  return films.find((filmModel) => filmModel.getId === filmId);
};

const removeFilmById = (films, filmId) => {
  return films.filter((filmModel) => filmModel.getId !== filmId);
};
export { getFilmById, removeFilmById };
