<template>
  <div>
    <v-card>
      <v-list two-line subheader>
        <v-subheader>Messages</v-subheader>
        <v-list-tile v-for="(thread, index) in Threads" :key="index">
        <v-list-tile-avatar  color="grey lighten-4" v-if="thread.uid !== user.uid">
          <img :src="thread.photoURL" alt="avatar">
        </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ thread.message }}</v-list-tile-title>
          </v-list-tile-content>
          <!-- <v-list-tile-action v-if="thread.uid === user.uid">
            <v-icon color="black" @click="remove(thread['.key'])">delete</v-icon>
          </v-list-tile-action> -->
        <v-list-tile-avatar  color="grey lighten-4" v-if="thread.uid === user.uid">
          <img :src="thread.photoURL" alt="avatar">
        </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
      <v-container>
        <v-textarea label="Message" v-model="Thread.message" @keyup.enter="newMessage()"></v-textarea>
        <v-btn @click="newMessage()">Send Message!</v-btn>
      </v-container>
    </v-card>
    <div class="overlay" v-if="!ready">
      <div class="flex-spinner">
        <v-progress-circular :size="200" :width="7" indeterminate color="amber"></v-progress-circular>
      </div> 
    </div>
  </div>
</template>

<script>

import Thread from '@/models/Thread'
import Room from '@/mixin/room'

export default {
    mixins: [Room],
    data () {
        return {
            Thread: new Thread(this.$myFirestore.collection('Threads')).init(),
            ready: false
        }
    },
    methods: {
        newMessage () {
            if (this.Thread.isEmpty()) {
              return
            }
            this.Thread.setCreatedAt(this.timestamp);
            this.Thread.add().then((success) => {
            }).catch(error => {
                console.log(error.message)
            })
            this.Thread.clearMessage()
        },
        remove (key) {
            this.Thread.delete(key).then(() => {
            }).catch(error => {
                console.log(error.message)
            })
        }
    }
}
</script>

<style scoped>
</style>
