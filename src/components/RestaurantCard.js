import { CDN_URL } from "../utils/constants";
const RestaurantCard = () => {
    const {resData} = props;
   
    const {
        cloudinaryImageId,
        name,
        avgRating,
        Cuisines,
        CostForTwo,
        sla,

    } = resData?.info;
      return (
          <div className="res-card" style={{ backgroundColor: "#f0f0f0" }} >
             < img
             className="res-logo"
             alt="res-logo"
              src={CDN_URL + cloudinaryImageId}
           />
          <h3>{name}</h3>
          <h4>{Cuisines.join(", ")}</h4>
          <h4>{avgRating} Stars</h4>
          <h4>{CostForTwo}</h4>
          <h4>{sla?.slaString}</h4>
          </div>
      );
  };
  export default RestaurantCard;