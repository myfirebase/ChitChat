import { FirestoreModel } from 'myfirebase' 

class Thread extends FirestoreModel {

    /**
     * Create new Thread.js Instance.
     * 
     * @param {object} ref
     */    
    constructor (ref) {
        super(ref)
    }

    /**
     * Define required properties.
     * 
     * @return array
     */
    required () {
        return []
    }

    /**
     * Set User id.
     * 
     * @param {int} uid
     * @return void
     */
    setUserId (uid) {
        this.uid = uid
    }

    /**
     * Set Photo url.
     * 
     * @param {string} photoURL
     * @return void
     */
    setPhotoUrl (photoURL) {
        this.photoURL = photoURL
    }

    /**
     * Set Username.
     * 
     * @param {string} username
     * @return void
     */
    setUsername (username) {
        this.username = username
    }

    /**
     * Set created_at.
     * 
     * @param {*} timestamp
     * @return void
     */
    setCreatedAt (timestamp) {
        this.created_at = timestamp
    }

    /**
     * Check if the message is empty.
     * 
     * @return {Boolean}
     */
    isEmpty () {
        return !this.message
    }

    /**
     * Clear message.
     * 
     * @return {void}
     */
    clearMessage () {
        this.message = ''
    }

    /**
     * Set thread message.
     * 
     * @param {void} message
     */
    setMessage (message) {
        this.message = message
    }
}

export default Thread;
