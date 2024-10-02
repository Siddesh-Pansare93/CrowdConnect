import { Client, ID, Databases } from "appwrite";
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
    async createEvent({ id = ID.unique(), capacity, latitude, longitude, date, description, endTime, eventTitle, featuredImage, location, organiser, startTime, tenantApproval, ticketPrice, ticketType }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id, {
                eventTitle,
                description,
                location,
                featuredImage,
                ticketType,
                date,
                ticketPrice,
                tenantApproval,
                capacity,
                startTime,
                endTime,
                latitude,
                longitude,
                organiser


            })
        } catch (error) {
            console.log(`Appwrite Error :: CreateEvent :: error :: ${error.message}`)

        }
    }

    // Update Event Details 

    async updateEvent({ id, title, description, date_time, location, featuredImage, organiser, attendees }) {
        try {
            return await this.database.updateDocument(
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

    async deleteEvent(id) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log(`Appwrite Error :: UpdateEvent :: error :: ${error.message}`)
        }
    }



    // Getting Particular Event 
    async getEvent(id) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log(`Appwrite Error :: GetEvent :: error :: ${error.message}`)
        }
    }

    // Get all Events or Events based on queries 

    async getAllEvents(queries = []) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Appwrite Error :: GetALLEvent :: error :: ${error.message}`)
        }
    }
}


const dbService = new DbService()

export default dbService 