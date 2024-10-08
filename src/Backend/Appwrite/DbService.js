import { Client, ID, Databases } from "appwrite";
import conf from "../../conf/conf";
import { Permission, Role } from 'appwrite';

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
    async createEvent({ id = ID.unique(), capacity, latitude, longitude, date, description, endTime, eventTitle, featuredImage, location, organiser, startTime, tenantApproval, ticketPrice = null, ticketType }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEventCollectionId,
                id, {
                eventTitle,
                description,
                location,
                featuredImage,
                ticketType,
                date,
                ticketPrice ,
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
                conf.appwriteEventCollectionId,
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
                conf.appwriteEventCollectionId,
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
                conf.appwriteEventCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Appwrite Error :: GetALLEvent :: error :: ${error.message}`)
        }
    }
 
    // Get only User Events

    async createUser({ id, name, email }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId, // Specify the user collection ID
                id, 
                {
                    name,
                    email,
                    createdAt: new Date().toISOString(), // Store creation date
                },
                // Permissions: allow the specific user to read and write their document
                [
                    Permission.read(Role.user(id)),   // Allow the user to read their document
                    Permission.write(Role.user(id))  // Allow the user to write (update) their document
                ]
            );
        } catch (error) {
            console.log(`Appwrite Error :: CreateUser :: error :: ${error.message}`);
        }
    }
    
    
    //

    async getUserById(id) {
        try {
            const user = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                id

            ); // Use the appropriate collection ID
            return user;
        } catch (error) {
            console.log(`Error fetching user: ${error.message}`);
            throw error; // Rethrow to handle it in authService if needed
        }
    }
}


const dbService = new DbService()

export default dbService 