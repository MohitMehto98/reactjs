import { Client, Databases, Query, Storage, ID } from "appwrite";
import config from "../config/config";
export class Services {
	client = new Client();
	dataBase;
	storage;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.dataBase = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, content, slug, featureImage, status, userId }) {
		try {
			return await this.dataBase.createDocument(
				config.appwriteDBID,
				config.appwriteCollectionId,
				slug,
				{ title, content, featureImage, userId, status }
			);
		} catch (error) {
			throw error;
		}
	}

	async updataPost(slug, { title, content, featureImage, status }) {
		try {
			return await this.dataBase.updateDocument(
				config.appwriteDBID,
				config.appwriteCollectionId,
				slug,
				{ title, content, featureImage, status }
			);
		} catch (error) {
			throw error;
		}
	}
	async deletePost(slug) {
		try {
			await this.dataBase.deleteDocument(
				config.appwriteDBID,
				config.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			throw error;
		}
	}
	async getPost() {
		try {
			return await this.dataBase.getDocument(
				config.appwriteDBID,
				config.appwriteCollectionId,
				slug
			);
		} catch (error) {
			throw error;
		}
	}
	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			await this.dataBase.getPosts.listDocuments(
				config.appwriteDBID.config.appwriteCollectionId,
				queries
			);
		} catch (error) {
			throw error;
		}
	}

	// file upload services

	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				config.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Error Occured in file upload section", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(config.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Error Occured in file delete section", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.storage.getFilePreview(config.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Error Occured in file preview section", error);
			return false;
		}
	}
}

const services = new Services();

export default services;
