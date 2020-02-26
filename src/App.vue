<template>
  <v-app>
    <div>
      <v-app-bar
        app
        :fixed="true"
        class="white"
        height="170px"
        elevation="0"
        style="padding-top: 50px;"
      >
        <v-col cols="6" class="left">
          <p style="font-size: 25px; color: #087cff">Dashboard</p>
          <p>Home > {{pageName}}</p>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-icon left>mdi-account</v-icon>01/27/2020
        </v-col>
      </v-app-bar>
      <v-app-bar app color="primary" dense height="80%" dark flat elevation="10">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          small
          flat
          hide-details
          label="Search"
          solo-inverted
          class="searchbar"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-app-bar>

      <v-footer app :fixed="true" class="white">
        <v-col cols="2"></v-col>
        <v-col class="text-right" cols="10">
          &copy;&nbsp;
          <b>2020 Getcoins Wallet</b>
        </v-col>
      </v-footer>
      <v-content class="backC" flat elevation="10">
        <div class="px-4" style="height:800px; padding-top: 40px">
          <router-view />
        </div>
      </v-content>
      <v-navigation-drawer flat elevation="10" v-model="drawer" app class="white">
        <v-img height="80" src="./assets/mark.png" elevation="10"></v-img>
        <v-img :aspect-ratio="16/9" src="https://picsum.photos/200">
          <v-avatar size="80" class="mt-5 ml-4">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div
            class="body-1"
            style="position:absoulte; color:white; background-color:black; opacity:0.5"
          >{{phoneNumber}}</div>
        </v-img>
        <v-list nav dense>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, i) in nav_items" :key="i" @click="changePage(item.url)">
              <router-link :to="{name: item.url}">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </router-link>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
/* eslint-disable */
import * as transactionAPI from '@/api/transactions'
import HelloWorld from './components/HelloWorld'
import { ROUTE_NAME as ROUTE_NAME_LOGIN } from '@/views/Login'
import { currentUserID, currentUserPhone } from '@/api/client'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data() {
    return {
      pageName: '',
      loading: true,
      drawer: true,
      width: 300,
      selected: 0,
      item: 0,
      nav_items: [
        { text: 'Dashboard', icon: 'mdi-account', url: 'Dashboard' },
        { text: 'Transactions', icon: 'mdi-lock', url: 'Transactions' },
        { text: 'Tickets', icon: 'mdi-access-point', url: 'Tickets' }
      ]
    }
  },

  computed: {
    phoneNumber() {
      return currentUserPhone()
    },
    userID() {
      return currentUserID()
    }
  },

  methods: {
    changePage(a) {
      this.pageName = a
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {
  transition: none !important;
}
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
.v-tabs-bar__content > a {
  text-decoration: none;
}
.v-content__wrap {
  height: 890px !important;
}
.v-tab {
  float: left;
}
.body-1 {
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  padding: 5px;
}
.searchbar {
  width: 300px;
}
.v-input__control {
  width: 100px;
}
.v-list-item > a {
  display: inherit;
  text-decoration: none;
}
/* .v-list-item__title{
   color: gray;
   } */
/* .v-list-item--active > a{
   color: #de931e !important;
   } */
/* .v-list-item--active{
   color: #07aee7;
   opacity: 1;
   } */
</style>
