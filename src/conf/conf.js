const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteEventCollectionId : String(import.meta.env.VITE_APPWRITE_EVENT_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID) , 
    appwriteUserCollectionId : String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    
}


export default conf 