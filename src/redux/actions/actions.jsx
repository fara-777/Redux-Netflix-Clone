import axios from "axios";
import { ActionTypes } from "../../constants/actionTypes";
import { options } from "../../constants/constants";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

// aksioan objesi olusturan bir fonksiyon
export const setLoading = (payload) => ({
  type: ActionTypes.SET_LOADING,
  payload,
});

// ! asenkron (thunk aksiyonu)
// verileri cekme ve reducera aktarma
export const getMovies = () => async (dispatch) => {
  const res = await axios.get("/movie/popular ", options);
  // verileri reducera aktarma
  dispatch({
    type: ActionTypes.SET_MOVIES,
    payload: res.data,
  });
};

export const getGenres = () => (dispatch) => {
  axios.get("/genre/movie/list", options).then((res) =>
    dispatch({
      type: ActionTypes.SET_GENRES,
      payload: res.data.genres,
    })
  );
};
