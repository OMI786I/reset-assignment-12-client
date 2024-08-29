import { useLoaderData } from "react-router-dom";

const BlogPageDetails = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="p-4">
      <div className="card  bg-base-100 shadow-xl">
        <figure>
          <img src={data.image} alt="Movie" className="w-96" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPageDetails;
