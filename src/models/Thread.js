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
     * Set created_at.
     * 
     * @param {*} timestamp
     * @return void
     */
    setCreatedAt (timestamp) {
        this.created_at = timestamp
    }
}

export default Thread;
