
import {handleActions} from 'redux-actions'

const initialState = {
  available: null,
  checking: false,
  downloading: null,
  downloaded: null,

  uptodate: false,
  error: null
}

export default handleActions({
  CHECK_FOR_SELF_UPDATE: (state, action) => {
    return {...state, checking: true}
  },

  SELF_UPDATE_AVAILABLE: (state, action) => {
    const {spec, downloading} = action.payload

    const base = {...state, checking: false}
    if (downloading) {
      return {...base, downloading: spec}
    } else {
      return {...base, available: spec}
    }
  },

  SELF_UPDATE_NOT_AVAILABLE: (state, action) => {
    const {uptodate} = action.payload
    return {...state, checking: false, available: null, uptodate}
  },

  SELF_UPDATE_ERROR: (state, action) => {
    const error = action.payload
    return {...state, error, available: null, downloading: null}
  },

  SELF_UPDATE_DOWNLOADED: (state, action) => {
    const {downloading} = state
    return {...state, downloaded: downloading, downloading: null}
  },

  SNOOZE_SELF_UPDATE: (state, action) => {
    return {...state, downloaded: null}
  },

  APPLY_SELF_UPDATE: (state, action) => {
    return state
  },

  DISMISS_STATUS: (state, action) => {
    return {...state, error: null, uptodate: false, available: null}
  }
}, initialState)
