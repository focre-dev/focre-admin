<template>
    <div>
        <v-breadcrumbs :items="items" divider="/" :class="layoutClass"> </v-breadcrumbs>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: ['layoutClass', 'items'],
    data: () => ({})
}
</script>
