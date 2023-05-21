<template>
    <q-stepper
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
                        
                        url="http://localhost/php/addSong.php"
                        :factory="SetName"
                        color="blue"
                        flat
                        bordered
                        accept="audio/*"
                        :max-files="1"
                        style="max-width: 350px"
                        method="post"
                        @failed = "errorCode"
                        @uploaded="completed"
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
    </q-stepper>
    
</template>

<script setup>
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'

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
    const errorCode = (info) => {
        $q.notify({
          type: 'negative',
          message: info.xhr.response
        })
    }
    const completed = () => {
        $q.notify({
          type: 'positive',
          message: 'Canzone aggiunta!'
        })
    }
    function SetName()
    {
        return new Promise((resolve) => {
          resolve({
            fieldName : 'audio',
            formFields : [{name : 'title', value : songTitle.value }, {name : 'artist' , value : Artist.value}]
          })
        })
    }
    
    
</script>

<style lang="sass">
.form 
    border: solid 2px $primary

</style>