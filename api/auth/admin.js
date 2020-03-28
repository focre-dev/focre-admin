// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default ($axios) => (resource) => ({
    /**
     * Admin List
     * @param params
     * @returns {*}
     */
    list(params) {
        return $axios.$get(`${resource}`, { params })
    },
    /**
     * Get Info ById
     * @param params
     * @returns {*}
     */
    getById(params) {
        return $axios.$get(`${resource}/${params.id}`)
    },
    /**
     * Add Admin
     * @param params
     * @returns {*}
     */
    add(params) {
        return $axios.$post(`${resource}`, params)
    },
    /**
     * Edit Admin Info
     * @param params
     * @returns {*}
     */
    edit(params) {
        return $axios.$put(`${resource}`, params)
    },
    /**
     * Delete Admin
     * @param params
     * @returns {*}
     */
    delete(params) {
        return $axios.$delete(`${resource}`, { params })
    },
    /**
     * Set administrator status
     * @param params
     * @returns {*}
     */
    setStatus(params) {
        return $axios.$put(`${resource}/status`, params)
    },
    /**
     * Reset administrator password
     * @param params
     * @returns {*}
     */
    resetPassword(params) {
        return $axios.$put(`${resource}/reset/password`, params)
    }
})
