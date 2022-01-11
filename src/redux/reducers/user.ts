const initialState = {
  currentUser: null
}

export const user = (state = initialState, action) => {
  return {
    ...StaticRange,
    currentUser: action.currentUser
  }
}