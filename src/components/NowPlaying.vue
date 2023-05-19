<template>
        <div class="fit row wrap justify-center items-center content-center q-py-sm">
                <SongInfo :title="store.title" :artist="store.artist"></SongInfo>        
                
                <div style="overflow: auto; min-height: 100px; max-height: 300px;  min-width: 100%; max-width: 100%;">
                        <PlayBar></PlayBar>
                </div>
        </div>
                        

</template>

<script setup>
import { ref } from 'vue'
import PlayBar  from '/src/components/PlayBar.vue'
import SongInfo from './SongInfo.vue';
import { store } from '../../public/store.js'
const props = defineProps({
        id: Number,
        title: String,
        artist: String,
        duration: Number,
        img: String
})
</script>
<style>
</style>
