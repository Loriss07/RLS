<template>
    <div>
        <q-drawer
        v-model="drawer"
        show-if-above
        :breakpoint="400"
        bordered
        
    >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list>

                <template v-for="(menuItem, index) in menuList" :key="index">
                <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                    <q-item-section avatar>
                    <q-icon :name="menuItem.icon" />
                    </q-item-section>
                    <q-item-section>
                    {{ menuItem.label }}
                    </q-item-section>
                </q-item>
                <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
                </template>

            </q-list>
        </q-scroll-area>
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
            </div>
        </q-img>
    </q-drawer>
    </div>
    
</template>
  
  <script setup>
  import { ref } from 'vue'
  
  const menuList = [
    {
      icon: 'change_circle',
      label: 'Cambia Canzone',
      separator: false
    },
    {
      icon: 'queue_music',
      label: 'Coda',
      separator: true
    },
    
  ]

  </script>