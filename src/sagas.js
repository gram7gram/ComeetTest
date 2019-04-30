import {all, fork} from 'redux-saga/effects';

import Home from './screens/Home/sagas';

export default function* root() {
  yield all([
    fork(Home),
  ]);
}
