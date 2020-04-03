<template>
    <div>
        <v-breadcrumbs :items="items" :class="layoutClass" divider="/"> </v-breadcrumbs>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: ['layoutClass', 'items'],
    data: () => ({})
}
</script>
