import InstagramFeed from "./InstagramFeed";

const Head = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-full md:w-1/3 p-4"></div>
      <div className="w-full md:w-1/2 p-4">
        <div className="mx-auto max-w-3xl">
          <InstagramFeed />
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4"></div>
    </div>
  );
};

export default Head;

