<template>
    <q-card class="my-card q-ma-sm" flat>
        <q-card-section horizontal @click="chooseSong">
            <q-img
                :src='url'
                :ratio="1/1"
                spinner-color="golden"
                spinner-size="40px"
                class="col-3"
                fit
            />
            <q-card-section>
                <q-card-section class="text-h5 q-gutter-sm q-pb-xs">
                    {{ title }}
                </q-card-section>
                <q-card-section class="text-body text-weight-thin q-pt-xs">
                    {{ artist }}
                </q-card-section>
            </q-card-section>
            
        </q-card-section>
    
        
        
    </q-card>
    
</template>
<script setup>

import { store } from '../../public/store.js';
import {ref} from 'vue'
const url = ref('icons/placeholder.webp');
const emits = defineEmits(['clicked']);

const props = defineProps({
    id: Number,
    title: String,
    artist: String,
    duration: Number,
    img: String,
    length: Number

})

function chooseSong()
{
    
    emits('clicked',{ title: props.title, artist: props.artist, id: props.id });
    /*store.getSong();
    store.play();*/

}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px

</style>