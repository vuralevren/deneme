import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/authSaga";
import companySaga from "./company/companySaga";

function* rootSaga() {
  yield all([fork(authSaga), fork(companySaga)]);
}

export default rootSaga;
