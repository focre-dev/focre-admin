// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default ($axios) => (resource) => ({
    /**
     * Login authorization
     * @param params
     * @returns {*}
     */
    login(params) {
        console.log($axios)
        console.log(resource)
        return $axios.$post(`${resource}/token`, params)
    }
})
