export default {
	created () {
		 this.$binding('Threads', this.$myFirestore.collection('Threads').orderBy('created_at', 'desc')).then(data => {
	        this.ready = true
	    })
	},
	computed: {
		timestamp () {
			return this.$store.state.firebase.firestore.FieldValue.serverTimestamp()
		}
	}
}
