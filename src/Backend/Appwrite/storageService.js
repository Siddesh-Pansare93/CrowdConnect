import { Storage, Client, ID } from "appwrite";
import conf from "../../conf/conf";

export class StorageService {
    client = new Client()
    storage


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.storage = new Storage(this.client)
    }

    // uploding image or any file on the appwrite storage 
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Error :: Appwrite :: UploadFile :: ${error.message}`)
            console.log(`Error :: Appwrite :: UploadFile :: ${error}`)
        }
    }

    // deleting the file 
    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId ,
                fileId
            )
        } catch (error) {
            console.log(`Error :: Appwrite :: DeleteFile :: ${error.message}`)   
        }
    }

    //updating the file 
    async updateFile(fileId){
        try {
            return await this.storage.updateFile(
                conf.appwriteBucketId ,
                fileId
            )
        } catch (error) {
            console.log(`Error :: Appwrite :: UpdateFile :: ${error.message}`)   
        }
    }

    // getting file preview so that it can be shown to users
     getFilePreview (fileId){
        try {
            return  this.storage.getFilePreview(
                conf.appwriteBucketId ,
                fileId,
                

            )
        } catch (error) {
            console.log(`Error :: Appwrite :: getFilePreview :: ${error.message}`)   
            
        }
    }
}

const storageService = new StorageService()

export default storageService

