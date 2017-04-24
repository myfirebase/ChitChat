<template>
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="panel panel-primary">
                <div class="panel-heading">Active Users</div>
                <div class="panel-body">
                <ul class="list-group">
                    <li class="list-group-item" v-for="activeuser in activeUsers">
                        {{activeuser.userEmail}}
                        <span class="pull-right active-user"><i class="fa fa-circle"></i></span>
                    </li>    
                </ul>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    Messages
                </div>
                <div class="panel-body">
                    <transition-group name="list-group" class = "list-group" tag="ul">
                        <li class="list-group-item" v-for="message in messages" :key="message">
                            {{message.message}} - <small><i>{{isUserMessageDisplay(message)}}</i></small>
                            <span class="delete-message pull-right" v-if="isUserMessage(message)" @click="deleteMessage(message)"><i class="fa fa-trash"></i></span>
                        </li>
                    </transition-group>
                </div>
                <div class="panel-footer">
                    <div class="input-group">
                        <input type="text" class = "form-control" v-model = "newMessage" v-on:keyup.enter="sendMessage()" placeholder="Write something...">
                        <div class="input-group-btn">
                            <button class="btn btn-primary" @click = "sendMessage()">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    mounted() {
        this.$auth.state({
            forward: '/app',
            redirect: '/login',
            then: (user) => {
                this.username = user.displayName
            },
            catch: () => {
                this.$destroy()
            }
        })
    },
    firebase() {
        return {
            messages: this.$store.state.database.child('messages'),
            activeUsers: this.$store.state.database.child('activeUsers')
        }
    },
    data() {
        return {
            message: "welcome",
            newMessage: '',
            error: '',
            username: ''
        }
    },
    methods: {
        sendMessage() {
            this.$firebaseRefs.messages.onDisconnect().cancel()
            this.$firebaseRefs.messages.push({
                message: this.newMessage,
                userName: this.username
            });
            this.newMessage = ''
        },
        deleteMessage(message) {
            this.$firebaseRefs.messages.child(message['.key']).remove()
        },
        isUserMessage(message) {
            return message.userName == this.$auth.user().displayName ? true : false
        },
        isUserMessageDisplay(message) {
            return message.userName == this.$auth.user().displayName ? 'you' : message.userName
        }
    }
}
</script>

<style>
    .delete-message{
        cursor: pointer;
        color: red;
    }

    .active-user{
        color: #00E676;
    }

    .list-group-enter-active, .list-group-leave-active {
        transition: all 1s;
    }

    .list-group-enter, .list-group-leave-to {
        opacity: 0;
        background: #0D47A1;
        color: #fff;
        box-shadow: 0 0 5px 1px gray;
    }
    .chat-body{
        overflow-y: scroll;
        height: 450px;
    }
</style>