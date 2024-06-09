import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import services from "../../appwrite/dbConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/dbConfig";
const PostForm = ({ post }) => {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.$id || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const slugTransform = useCallback((value) => {
		console.log(value);
		if (value && typeof value == "string") {
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");
		}
		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, name) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title), { shouldValidate: true });
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);
	const submit = async (data) => {
		if (post) {
			const imageFile = data.image[0]
				? await services.uploadFile(data.image[0])
				: null;
			if (imageFile) {
				services.deleteFile(post.featuredImage);
			}

			const dbPost = await services.updatePost(post.$id, {
				...data,
				featuredImage: imageFile ? imageFile.$id : undefined,
			});
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			const imageFile = await appwriteService.uploadFile(data.image[0]);
			if (imageFile) {
				const imageFileId = imageFile.$id;
				data.featuredImage = imageFileId;
				const dbPost = await services.createPost({
					...data,
					userId: userData.$id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};
	console.log(post.featuredImage);
	console.log(post);
	console.log(post && "mohit");
	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/>
				<RTE
					label="Content :"
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={appwriteService.getFilePreview(post.featuredImage)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full"
				>
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
