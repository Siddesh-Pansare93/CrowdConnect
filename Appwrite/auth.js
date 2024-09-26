import { Client  , Account  , ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService  {
    client = new Client() ;
    account ;


    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) ; 
        this.account = new Account(this.client)
     }

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

    async login({email , password}){
        try {
            return  await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            console.log(`Appwrite Error :: Login :: error :: ${error.message}`)
        }

    }

    async getCurrentUser(){
        try {
                this.account.get()
        }
        catch (error) {
            console.log(`Appwrite Error :: getCurrentUser :: error :: ${error.message}`)

        }

    }

    async logout (){
        try {
            return this.account.deleteSession('current')
        } catch (error) {
            console.log(`Appwrite Error :: Logout :: error :: ${error.message}`)
        }
    }
    
}


