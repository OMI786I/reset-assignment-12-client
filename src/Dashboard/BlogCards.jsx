const BlogCards = () => {
  return (
    <div className="card w-full bg-base-100 shadow-2xl rounded-lg overflow-hidden transform ">
      <figure className="relative">
        <img
          src="https://i.ibb.co/LC8fJmh/240-F-91519135-Dlb-Nc-DSnq-JAb-D53-UKqkddn-Fg0-LV2g-KSj.jpg"
          alt="Blog Thumbnail"
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="text-white text-2xl font-semibold">This is Title</h2>
        </div>
      </figure>
      <div className="card-body p-6">
        <p className="text-gray-700 text-base leading-relaxed">content</p>
      </div>
    </div>
  );
};

export default BlogCards;
