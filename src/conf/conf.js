const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.APPWRITE_BUCKET_ID) , 
    
}


export default conf 