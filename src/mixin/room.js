export default {
	created () {
		 this.$binding('Threads', this.$myFirestore.collection('Threads').orderBy('created_at', 'desc')).then(data => {
	        this.ready = true
	    })

        this.Thread.setUserId(this.$auth.user().uid)
        this.Thread.setUsername(this.$auth.user().displayName)
        this.Thread.setPhotoUrl(this.$auth.user().photoURL)
	},
	computed: {
		timestamp () {
			return this.$store.state.firebase.firestore.FieldValue.serverTimestamp()
		},
		user () {
		 	return this.$auth.user()
		}
	}
}
