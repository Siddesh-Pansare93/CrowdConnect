import { Client, Account, ID, Databases } from "appwrite";
import conf from "../conf/conf";

export class DbService {

    client = new Client()
    database

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client)

    }


    // Creating Event 
    async createEvent({ id, title, description, date_time, location, featuredImage, organiser, attendees }) {
        try {
            return this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id, {
                title,
                description,
                date_time,
                location,
                featuredImage,
                organiser,
                attendees
            })
        } catch (error) {
            console.log(`Appwrite Error :: CreateEvent :: error :: ${error.message}`)

        }
    }

    // Update Event Details 

    async updateEvent({ id, title, description, date_time, location, featuredImage, organiser, attendees }) {
        try {
            return this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    description,
                    date_time,
                    location,
                    featuredImage,
                    organiser,
                    attendees
                }
            )
        } catch (error) {
            console.log(`Appwrite Error :: UpdateEvent :: error :: ${error.message}`)
        }
    }

    // Delete Event 

    

    // Getting Particular Event 
    async getEvent(id) {
        try {
            return this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log(`Appwrite Error :: GetEvent :: error :: ${error.message}`)
        }
    }

    // Get all Events or Events based on queries 

    async getAllEvents(queries = [Query.equal("status", "active")]) {
        try {
            return this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Appwrite Error :: GetALLEvent :: error :: ${error.message}`)
        }
    }


}
