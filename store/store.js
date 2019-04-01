import Vuex from 'vuex'

import defaultState from './state.js'
import mutations from './mutation.js'

export default () => {
    return new Vuex.Store({
        state:defaultState,
        mutations
    })
}