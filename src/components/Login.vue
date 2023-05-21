<template>
    <q-page class="row flex-center">
        <div class="login col-sm-5 rounded-borders">
            <div class="column q-pa-xl">
                <q-input bottom-slots v-model="user" label="Username">
                    <template v-slot:before>
                        <q-icon name="person" />
                    </template>
                </q-input>

                <q-input type="password" bottom-slots v-model="passwd" label="Password">
                    <template v-slot:before>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <q-btn class="btn-login q-mt-lg" color="golden" icon="login" label="Log-in" @click="Entra" />

                <q-btn class="q-mt-lg" color="accent" label="Non sei registrato?" to='/signup'/>
                <q-btn class="q-mt-lg" color="grey-5" label="Torna indietro" to='/'/>


            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { store } from '../../public/store.js'
import axios from 'axios'

    const user = ref(null)
    const passwd = ref(null)
    const router = useRouter();
    const $q = useQuasar();
async function  Entra ()
{
    let login_user = new XMLHttpRequest();
    let sendUser = new Object({
        username : user.value,
        password : passwd.value,
        method   : "login"
    })
    let url = UrlEncode(sendUser)
    login_user.open("POST", "http://167.235.151.123/php/user.php", true);
    login_user.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    login_user.onreadystatechange = function() {
    if (this.status == 200) 
    {
        let data = JSON.parse(login_user.response);
        $q.notify({
                type : 'positive',
                message : data.message
        });
        console.log(login_user.response);
        store.isAuth = true;
        store.role = data.role
        router.push('/stream');
    }
    else if (this.status == 401)
    {
        $q.notify({
                type : 'negative',
                message : login_user.response
        });
    }
    };
    login_user.send(url);

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

.login 
    border : solid 2px $golden

.btn-login 
    background-color : $golden

</style>