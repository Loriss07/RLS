<template>
   <q-form
    
    method="post"
    @submit="submit"
    @reset="onReset"
    class="q-gutter-md"
    enctype="multipart/form-data"
   >
    
    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      <q-input v-model="songTitle" name="title" type="text" label="Titolo" :rules="[ val => val && val.length > 0 || 'Inserisci il titolo']" />
      <q-input v-model="Artist" name="artist" type="text" label="Artista" :rules="[ val => val && val.length > 0 || 'Inserisci l\'artista']"/>       
      <q-file v-model="file" name="audio" label="Carica canzone" />
    </div>
   </q-form>
    <!--q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
    
    <q-step
        :name="1"
        title="Inserisci dati"
        icon="music"
        :done="step > 1"
      >
        <div class="row wrap justify-center items-end content-start">
        <div class="col-4 content-center rounded-border form">
            <div class="column q-pa-xl">
                    <q-input v-model="songTitle" type="text" label="Titolo" :rules="[ val => val && val.length > 0 || 'Inserisci il titolo']" />
                    <q-input v-model="Artist" type="text" label="Artista" :rules="[ val => val && val.length > 0 || 'Inserisci l\'artista']"/>
                  
            </div>
        
        

    </div>
    </div>
      </q-step>
      <q-step
        :name="2"
        title="Carica file"
        icon="upload_file"
        :done="step > 2"
      >
            <q-uploader
                        
                        ref="File"
                        :factory="SetName"
                        color="blue"
                        flat
                        bordered
                        accept="audio/*"
                        :max-files="1"
                        style="max-width: 350px"
                        method="post"
                        :form-fields="[{
                                          title:songTitle.value,
                                          artist:Artist.value,
                                      }]"
                        @start="submit"
                        @rejected = "negate"
            />
      </q-step>


      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="!continua && Artista && songTitle" @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" />
          <q-btn v-else @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper-->
    
</template>

<script setup>
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'
    import axios from 'axios';

    const step = ref(1)
    const Artist = ref(null);
    const songTitle = ref(null);
    const continua = ref(false);
    const file = ref(null)
    const $q = useQuasar();

    const negate = () => {
        $q.notify({
          type: 'negative',
          message: `Il file che hai inserito non è valido.`
        })
    }
    function SetName()
    {
        return new Promise((resolve) => {
          resolve({
            fieldName : 'audio'
          })
        })
    }
    function submit()
    {
      const data = new FormData("songData")
      /*  const data = new Object({
            title:songTitle.value,
            artist:Artist.value,
            file:file.value
        })*/
        //var stringdata = UrlEncode(data);
        const send = new XMLHttpRequest();
        send.onreadystatechange = function() {
          console.log(send.response)
        if (this.readyState == 4 && this.status == 201) {

                $q.notify({
                    type:'positive',
                    message: send.response,
                })
            }
            else if (this.status == 403)
            {
                $q.notify({
                    type:'negative',
                    message: send.response,
                })
            }
        } 
        send.open("POST", "http://localhost/php/addSong.php", true);
        send.send(data);
        continua.value = true;
        
    }

function UrlEncode(object)
{
    let urlEncoded = "", urlEncodedDataPairs = [], name;
    for( name in object ) {
    urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(object[name]));
    }
    urlEncoded = urlEncodedDataPairs.join('&');
    return urlEncoded;
}
    
</script>

<style lang="sass">
.form 
    border: solid 2px $primary

</style>