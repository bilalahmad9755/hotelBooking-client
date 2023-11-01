import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://127.0.0.1:3000/hotel/getAll?limit=3"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>

        {data.map((item) => (
          <div className="featuredItem">
          <img
            src= {item?.coverPhoto}
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>{item?.city}</h1>
            <h2>{item?.name}</h2>
          </div>
        </div>
        ))}
        </>
      )}
    </div>
  );
};

export default Featured;
