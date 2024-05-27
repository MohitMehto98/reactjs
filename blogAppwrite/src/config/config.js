const config = {
	appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
	appwriteProjectId: String(import.meta.env.VITE__APPWRITE_PROJECT_ID),
	appwriteDBID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
	appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
	appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
