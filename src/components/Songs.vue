<template>
    <div class="row">
        <div class="col-4 q-pl-md">
            <q-input v-model="text" type="text" placeholder="Cerca"/>
        </div>
    </div>
    
    <div>
        <!--Song title="Alejandro" artist="Lady Gaga"></!--Song>
        <Song-- title="Candyland" artist="Tobu"></Song-->
        <Song
        @clicked="loadStore" 
        v-for="song in songs" 
            :title="song.title"
            :artist="song.artist"
            :id="song.id"
            :key="song.id"
            >
        </Song>
    </div> 
    
        
    

</template>
<script setup>
import { ref,onMounted } from 'vue'
import { store } from "../../public/store.js"
import Song from 'components/SongInfo.vue'
import  axios  from 'axios'

const songs = ref([
])


onMounted(() => {

    axios({
    method: 'get',
    url: 'http://167.235.151.123/php/songs.php',
    responseType: 'json'
    })
    .then((response) => 
        { 
            response.data.forEach(element => {
                let song = new Object()
                console.log(element)
                song.id = element.songID
                song.title = element.titolo
                song.artist = element.artista
                songs.value.push(song)
            });

            console.log(songs.value)
        })
})


const loadStore = (songs) =>  { 
    
    console.log(songs)
    store.artist = songs.artist
    store.title = songs.title
    store.id = songs.id

    console.log("ok " + store.title + store.id)
  } 

</script>


