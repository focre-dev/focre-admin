<template>
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="text-uppercase font-weight-regular title">
                        <span>
                            F
                        </span>
                        <span>
                            Focre
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            drawer: null
        }
    },
    computed: {},
    mounted() {},
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>
<style lang="scss">
@import '~assets/css/common/sidebar.scss';
</style>
