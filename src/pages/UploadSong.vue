<template>
    
    <!--div class="row wrap justify-center items-end content-start">
        <div class="col-4 content-center rounded-border form">
            <div class="column q-pa-xl">
                <q-form
                @submit="submit"
                class="q-gutter-md"
                enctype="multipart/form-data"
                >
                    <q-input v-model="songTitle" type="text" label="Titolo" :rules="[ val => val && val.length > 0 || 'Inserisci il titolo']" />
                    <q-input v-model="Artist" type="text" label="Artista" :rules="[ val => val && val.length > 0 || 'Inserisci l\'artista']"/>
                        <q-uploader
                        url="http://localhost/php/addSong.php"
                        :factory="SetName"
                        color="blue"
                        flat
                        bordered
                        accept="audio/*"
                        style="max-width: 300px"
                        @rejected = "negate"
                    />
                    <q-btn color="primary" icon="send" type="submit" label="Invia" />
                </q-form>
            </div>
        
        

    </div>
    </div-->
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
    
      <q-step
        :name="1"
        title="Carica file"
        icon="upload_file"
        :done="step > 1"
      >
            <q-uploader
                        url="http://localhost/php/addSong.php"
                        :factory="SetName"
                        color="blue"
                        flat
                        bordered
                        accept="audio/*"
                        style="max-width: 300px"
                        @rejected = "negate"
                        @finish="continua = true"
            />
      </q-step>

      <q-step
        :name="2"
        title="Inserisci dati"
        icon="music"
        :done="step > 2"
      >
        <div class="row wrap justify-center items-end content-start">
        <div class="col-4 content-center rounded-border form">
            <div class="column q-pa-xl">
                <q-form
                @submit="submit"
                class="q-gutter-md"
                enctype="multipart/form-data"
                >
                    <q-input v-model="songTitle" type="text" label="Titolo" :rules="[ val => val && val.length > 0 || 'Inserisci il titolo']" />
                    <q-input v-model="Artist" type="text" label="Artista" :rules="[ val => val && val.length > 0 || 'Inserisci l\'artista']"/>
                        
                    <q-btn color="primary" icon="send" type="submit" label="Invia"  />
                </q-form>
            </div>
        
        

    </div>
    </div>
      </q-step>

      <q-step
        :name="3"
        title="Fatto!"
        icon="assignment"
      >
        Canzone aggiunta!
      </q-step>


      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="!continua" @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" disable/>
          <q-btn v-else @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    
</template>

<script setup>
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'
    import axios from 'axios';

    const step = ref(1)
    const Artist = ref("");
    const songTitle = ref("");
    const continua = ref(false);

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
        const data = new Object({
            title:songTitle.value,
            artist:Artist.value
        })
        var JSONd = JSON.stringify(data);
        const send = new XMLHttpRequest()
        send.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
                $q.notify({
                    type:'positive',
                    message: send.response,
                })
            }
            else if (this.status == 500)
            {
                $q.notify({
                    type:'negative',
                    message: send.response,
                })
            }
        } 
        send.open("POST", "http://localhost/php/addSong.php", true);
        send.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        send.send(JSONd);
        continua.value = true;
    }

    
    
</script>

<style lang="sass">
.form 
    border: solid 2px $primary

</style>