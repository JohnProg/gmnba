module.exports = (
  state = {
    players: []
  },
  action
) => {
  switch (action.type) {
    case "ADD_PLAYERS":
      state = {
        ...state,
        players: [...state.players, action.payload]
      };
      return state;

    default:
      return state;
  }
};
