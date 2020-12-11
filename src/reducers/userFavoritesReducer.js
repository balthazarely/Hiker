const initialState = {
  favoriteTrails: null,
};

const userFavorites = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRAILS":
      return {
        ...state,
        favoriteTrails: action.payload.favoriteTrails,
      };

    default:
      return state;
  }
};

export default userFavorites;
