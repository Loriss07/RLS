<template>
    <q-page>
        <div class="fit row wrap justify-start items-start content-start">
            <!--SideBar></SideBar-->
            <div class="col-grow">
                    <div style="overflow:auto; min-width:100%; max-width:100%; height:500px; background-color:midnightblue;">
                        <Playing></Playing>
                    </div>
                    <div style="overflow:auto; min-width:100%; max-width:100%;background-color: rgb(95, 160, 145);" class="q-p-sm">
                        <Songs></Songs>
                    </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import SideBar from '/src/components/Sidebar.vue'
import Playing from '/src/components/NowPlaying.vue'
import Songs from '/src/components/Songs.vue'
import { store } from "../../public/store.js"

/*fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => alert(json))*/

</script>
