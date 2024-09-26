import { Client  , Account  , ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService  {
    client = new Client() ;
    account ;

    //Account will be Created Only when the Object of this class will be made
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) ; 
        this.account = new Account(this.client)
     }

     // Creating Account For New Users || SignUp Function 
    async CreateAccount ({email , password , username}){
        try {
            const userAccount = await this.account.createAccount(ID.unique() , email , password , username)
            if(userAccount){
                // calling Login Function 
                 this.login({email , password})
            }else{
                return userAccount
            }
        } catch (error) {
            console.log(`Appwrite Error :: CreateAccount :: error :: ${error.message}`)
        }
       
    }

    // Login Function 
    async login({email , password}){
        try {
            return  await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            console.log(`Appwrite Error :: Login :: error :: ${error.message}`)
        }

    }

    // Get data of current User 
    async getCurrentUser(){
        try {
                await this.account.get()
        }
        catch (error) {
            console.log(`Appwrite Error :: getCurrentUser :: error :: ${error.message}`)

        }

    }

    // Logout Function 
    async logout (){
        try {
            return  await this.account.deleteSession('current')
        } catch (error) {
            console.log(`Appwrite Error :: Logout :: error :: ${error.message}`)
        }
    }

}

// Creating object of above Class 
const authService = new AuthService()

export default authService
