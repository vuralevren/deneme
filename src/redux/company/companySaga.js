import { all } from "redux-saga/effects";

// function* registerSaga({
//   payload: {  onSuccess, onFailure },
// }) {
//   try {
//   } catch (e) {
//     if (_.isFunction(onFailure)) onFailure(e);
//   }
// }

export default function* rootSaga() {
  yield all([]);
}
