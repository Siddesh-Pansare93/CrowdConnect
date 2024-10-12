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
    async createEvent({ id = ID.unique(), capacity, categories , latitude, longitude, date, description, endTime, eventTitle, featuredImage, location, organiser, startTime, tenantApproval, ticketPrice = null, ticketType }) {
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
                organiser , 
                categories


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
                conf.appwriteEventCollectionId,
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

    async addUserToEventAttendees(eventId, userId) {
        try {
            const event = await this.getEvent(eventId);
            
            const currentRegistration = event.registrations || [];
            
            const updatedRegistration = [...currentRegistration, userId];
    
            const response = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEventCollectionId,
                eventId,
                {
                    registrations: updatedRegistration,
                }
            );
    
            return response;
        } catch (error) {
            console.error('Failed to update attendees:', error);
            throw error;
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
            console.log(id)
            console.log(conf.appwriteDatabaseId)
            console.log(conf.appwriteUserCollectionId)
            const result = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId, // Specify the user collection ID
                id, 
                {
                    id , 
                    name,
                    email,
                    createdAt: new Date().toISOString(), 
                },
               
            );
            console.log(result)
            return result
        } catch (error) {
            console.log(`Appwrite Error :: createUser :: error :: ${error.message}`)
            console.log(`Appwrite Error :: createUser :: error :: ${error}`)
        }
    }
    
    
    //

    async getUserById(id) {
        try {
            const user = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                id

            ); 
            return user;
        } catch (error) {
            console.log(`Error fetching user: ${error.message}`);
            throw error; 
        }
    }
}


const dbService = new DbService()

export default dbService 