import {all, throttle, put, select, takeEvery} from 'redux-saga/effects';
import {CHANGE_SEX, LOAD_WEATHER_REQUEST} from "../actions";
import FetchWeather from "../actions/FetchWeather";

function* requestItems() {
  yield put({
    type: LOAD_WEATHER_REQUEST
  })
}

function* fetchItems() {

  const {currentSex} = yield select(store => store.Home)

  yield put(FetchWeather({sex: currentSex}))
}

export default function* root() {
  yield all([

    takeEvery([CHANGE_SEX], requestItems),

    throttle(300, LOAD_WEATHER_REQUEST, fetchItems)

  ])
}
