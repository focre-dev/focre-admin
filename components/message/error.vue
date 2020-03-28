<template>
    <v-snackbar v-model="show" :color="color" :timeout="timeout" :top="'top'" :vertical="'vertical'">
        {{ text }}
    </v-snackbar>
</template>

<script>
export default {
    name: 'ErrorMessage',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        timeout: {
            type: Number,
            default: 1500
        },
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            color: 'error',
            show: this.isShow
        }
    },
    watch: {
        isShow(val) {
            this.show = val
        }
    }
}
</script>
