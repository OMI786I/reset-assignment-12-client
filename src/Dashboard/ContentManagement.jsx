import { Link } from "react-router-dom";
import BlogCards from "./BlogCards";

const ContentManagement = () => {
  return (
    <div className="p-2">
      <div className="flex justify-end">
        <Link to={"/dashboard/blogForm"}>
          {" "}
          <button className="btn btn-neutral">Add Blogs</button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 p-2">
        <BlogCards></BlogCards>
      </div>
    </div>
  );
};

export default ContentManagement;
