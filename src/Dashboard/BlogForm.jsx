import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const status = "draft";
    const submitData = { ...data, status };
    axios
      .post("https://b9a12-server-side-omi-786-i.vercel.app/blog", submitData)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("You have successfully added");
          navigate("/dashboard/content-management");
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error("There was an error adding the data");
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-base-100 shadow-2xl rounded-lg"
    >
      <h1 className="text-3xl text-center">Add Blog</h1>
      <div className="form-control mb-4">
        <label className="label" htmlFor="title">
          <span className="label-text text-lg font-semibold">Title</span>
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          id="title"
          className="input input-bordered w-full"
          placeholder="Enter the blog title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="thumbnail">
          <span className="label-text text-lg font-semibold">
            Thumbnail Image
          </span>
        </label>
        <input
          {...register("image", { required: "image is required" })}
          type="text"
          id="thumbnail"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control mb-6">
        <label className="label" htmlFor="content">
          <span className="label-text text-lg font-semibold">Content</span>
        </label>
        <textarea
          {...register("content", { required: "Content is required" })}
          id="content"
          className="textarea textarea-bordered w-full h-40"
          placeholder="Enter the blog content"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
