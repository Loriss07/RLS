<template>
    <q-page class="row flex-center">
        <div class="login col-sm-5 rounded-borders">
            <div class="column q-pa-xl">
                <q-input bottom-slots v-model="name" label="Name">
                </q-input>
                
                <q-input bottom-slots v-model="surname" label="Surname">
                </q-input>
                <q-input bottom-slots v-model="email" label="Email">
                    <template v-slot:before>
                        <q-icon name="email" />
                    </template>
                </q-input>
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
                <q-option-group 
                    v-model="group"
                    color="accent"
                    :options="options"
                    inline
                />
                <q-btn class="btn-login q-mt-lg" color="golden" icon="login" label="Registrati" @click="Entra" />
                <q-btn class="q-mt-lg" color="grey-5" label="Torna indietro" to='/'/>
            </div>
            
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    const name = ref(null)
    const surname = ref(null)
    const user = ref(null)
    const passwd = ref(null)
    const email = ref(null)
    const sex = ref('M')
    const router = useRouter();
    var create_user = new XMLHttpRequest();
    const options = [
        {
          label: 'Maschio',
          value: 'M'
        },
        {
          label: 'Femmina',
          value: 'F'
        }
    ]

function Entra()
{
    let new_user = new Object({
        name : name.value,
        surname : surname.value,
        gender : sex.value,
        username : user.value,
        password : passwd.value,
        email : email.value
    })
    let url = UrlEncode(new_user)
    create_user.open("POST", "http://localhost/php/user.php", true);
    create_user.setRequestHeader("Content-type", "application/x-www-form-urlencoded");;
    create_user.onreadystatechange = function() {
    if (this.status == 200) 
    {
       
       router.push('/board');
       console.log(create_user.response);
    }
    };
    create_user.send(url);

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
    border : solid 2px $accent

.btn-login 
    background-color : $accent
    

</style>