import Auth from '~/api/auth/auth'
import Admin from '~/api/auth/admin'

export default (ctx, inject) => {
    // inject the repository in the context (ctx.app.$repository)
    // And in the Vue instances (this.$repository in your components)
    const AuthWithAxios = Auth(ctx.$axios)
    inject('Auth', AuthWithAxios('/auth'))

    const AdminWithAxios = Admin(ctx.$axios)
    inject('Admin', AdminWithAxios('/auth/admin'))
}
