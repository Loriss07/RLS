<template>
    <Stream></Stream>
    <q-btn v-if="auth == 'A'" color="primary" icon="dashboard" label="Dashboard" to="/board" />
</template>

<script setup>
import { ref } from 'vue'
    import Stream from '/src/components/Stream.vue'
    import { store } from '../../public/store.js'

    const auth = ref(store.role)
</script>