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
    async createEvent({ id = ID.unique(), capacity, categories , latitude, longitude, date, description, endTime, eventTitle, featuredImage, location, organiser, startTime, tenantApproval, ticketPrice = null, ticketType, registrations, attendees }) {
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
                organiser,
                registrations,
                attendees , 
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

    async addUserToEventRegistrations(eventId, userId) {
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
    
    async addUserToEventAttendees(eventId, userId) {
        try {
            // Fetch the current event details
            const event = await this.getEvent(eventId);
            
            // Get the current attendees or initialize an empty array
            const currentAttendees = event.attendees || [];
            
            // Check if the user is already an attendee to prevent duplicates
            if (!currentAttendees.includes(userId)) {
                // Add the userId to the attendees list
                const updatedAttendees = [...currentAttendees, userId];
    
                // Update the event document in the database
                const response = await this.database.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteEventCollectionId,
                    eventId,
                    {
                        attendees: updatedAttendees // Update the attendees array
                    }
                );
    
                return response; // Return the response from the database update
            } else {
                console.log(`User with ID ${userId} is already an attendee.`);
                return event; // Return the existing event data if user is already an attendee
            }
        } catch (error) {
            console.error('Failed to update attendees:', error);
            throw error; // Re-throw the error for further handling
        }
    }
    
    async updateRegistrationStatus(eventId, userId, action) { 
        try {
            // Fetch the current event details
            const event = await this.getEvent(eventId);
    
            // Update registrations based on action
            let updatedRegistrations = event.registrations || [];
            let updatedAttendees = event.attendees || [];
    
            // Remove user from registrations
            updatedRegistrations = updatedRegistrations.filter((id) => id !== userId);
    
            // If approved, add to attendees
            if (action === 'approved') {
                updatedAttendees.push(userId);
            }
    
            // Update the event document in the database
            const response = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEventCollectionId,
                eventId,
                {
                    registrations: updatedRegistrations,
                    attendees: updatedAttendees,
                }
            );
    
            return response; // Return the response from the database update
        } catch (error) {
            console.error(`Error updating registration status for event ${eventId}:`, error);
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