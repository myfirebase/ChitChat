<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="panel panel-primary">
                    <div class="panel-heading">Active Users</div>
                    <div class="panel-body">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="activeuser in activeUsers">
                                {{activeUser(activeuser)}}
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
                    <div class="panel-body chat-body">
                        <transition-group name="list-group" class="list-group chat" tag="ul">
                            <li class="clearfix list-group-item" v-for="message in messages" :key="message">
                                <span class="pull-right">
                                                <img :src="getUserAvatar(message)" alt="User Avatar" class="img-circle user-avatar" />
                                            </span>
                                <div class="clearfix">
                                    <div class="header">
                                        <strong class="primary-font">{{message.userName}}</strong>
                                    </div>
                                    <p v-if="message.show" @dblclick="editMessage(message)">
                                        {{message.message}}
                                    </p>
                                    <div class="row pull-left" v-if="!message.show">
                                        <div class="col-md-6 col-sm-12">
                                            <input type="text" v-model="messageModel" class="form-control" v-on:keyup.enter="updateMessage(message)">
                                        </div>
                                        <div class="col-md-6 col-sm-12" align="center">
                                            <button class="btn btn-info btn-sm" @click="updateMessage(message)">update</button>
                                            <button class="btn btn-danger btn-sm" @click="message.show = true">cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </transition-group>
                    </div>
                    <div class="panel-footer">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="newMessage" v-on:keyup.enter="sendMessage()" placeholder="Write something...">
                            <div class="input-group-btn">
                                <button class="btn btn-primary" @click="sendMessage()">Add</button>
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
                    if (!user.photoURL) {
                        this.$auth.updateProfilePicture({
                            ref: 'https://firebasestorage.googleapis.com/v0/b/chitchat-7117b.appspot.com/o/images%2Fdefault.jpg?alt=media&token=d5936638-7c72-44f5-97ce-be1758a3788f',
                            result: () => {
    
                            },
                            error: (error) => {
    
                            }
                        })
                    }
                },
                catch: () => {
                    this.$destroy()
                }
            })
            console.log(this.$firebaseRefs.messages)
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
                username: '',
                edit: false,
                messageModel: ''
            }
        },
        methods: {
            sendMessage() {
                this.$firebaseRefs.messages.onDisconnect().cancel()
                this.$firebaseRefs.messages.push({
                    message: this.newMessage,
                    userName: this.username,
                    show: true,
                    photoURL: this.$auth.user().photoURL
                });
                this.newMessage = ''
            },
            deleteMessage(message) {
                this.$firebaseRefs.messages.child(message['.key']).remove()
            },
            isUserMessage(message) {
                return message.userName == this.$auth.user().displayName ? true : false
            },
            isUserMedia(message) {
                return message.userName == this.$auth.user().displayName ? 'pull-right' : 'pull-left'
            },
            isUserMessageDisplay(message) {
                return message.userName == this.$auth.user().displayName ? 'you' : message.userName
            },
            getUserAvatar(message) {
                return message.photoURL
            },
            editMessage(message) {
                message.show = false
                this.messageModel = message.message
            },
            updateMessage(message) {
                this.$firebaseRefs.messages.child(message['.key']).update({
                    message: this.messageModel,
                    photoURL: this.$auth.user().photoURL,
                    userName: this.$auth.user().displayName
                })
                message.show = true
            },
            activeUser(user) {
                return user.userName ? user.userName : user.userEmail
            }
        }
    }
</script>

<style>
    .delete-message {
        cursor: pointer;
        color: red;
    }
    
    .active-user {
        color: #00E676;
    }
    
    .list-group-enter-active,
    .list-group-leave-active {
        transition: all 1s;
    }
    
    .list-group-enter,
    .list-group-leave-to {
        opacity: 0;
        background: #0D47A1;
        color: #fff;
        box-shadow: 0 0 5px 1px gray;
    }
    
    .chat-body {
        overflow-y: scroll;
        height: 450px;
    }
    
    .user-avatar {
        max-width: 50px;
        min-height: 50px;
    }
</style>