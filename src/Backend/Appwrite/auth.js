import { Client, Account, ID } from "appwrite";
import conf from "../../conf/conf";
import dbService from "./DbService";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log(userAccount);

                // Store user details in the database
                const userId = userAccount.$id; // Get user ID from the account creation response
                  await dbService.createUser({
                    id: userId,
                    name,
                    email,
                });

                return this.login({email  ,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const result = await this.account.createEmailPasswordSession(email, password)
            return result
        } catch (error) {
            throw error
        }
    }

    //  async session({email , password}){
    //     return await this.account.createEmailPasswordSession(email, password);
    //  }

    //  async verification(url){
    //     return await this.account.createVerification(url);
    //  }

    //  async updateVerification(id,secret){
    //     return await this.account.updateVerification(id,secret);
    //  }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null
    }

    async logout() {
        try {
            await this.account.deleteSessions('current')
        } catch (error) {
            throw error

        }
    }

    //To get user by its id 

    async getUserById(userId) {
        try {
            const user = await dbService.getUserById(userId); // Use the dbService to get the user
            return user;
        } catch (error) {
            console.log(`Appwrite Error :: Get user By Id :: error :: ${error.message}`);
            return null; // Return null in case of an error to handle it gracefully.
        }
    }
}

const authService = new AuthService()

export default authService