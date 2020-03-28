export const state = () => ({
    model: null,
    type: 'default (no property)',
    clipped: false,
    floating: false,
    mini: false
})

export const mutations = {
    SET_STATUS(state) {
        state.model = !state.model
    }
}
