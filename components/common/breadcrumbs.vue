<template>
    <div>
        <v-breadcrumbs :items="items" :class="layoutClass" divider="/"> </v-breadcrumbs>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: {
        items: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        layoutClass: {
            type: String,
            default: ''
        }
    },
    data: () => ({})
}
</script>
