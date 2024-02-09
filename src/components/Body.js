import RestaurantCard from "./RestaurantCard";
import { useState , useEffect} from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  
  //local state variable - super powerful variable
  const[listofRestaurants ,setListofRestaurant] = useState([]);
  const[filteredRestaurant ,setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
//whenever state variables update , react triggers a reconcilation cycle (re-renders the components)
console.log("Body Rendered");

      useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"    
        );

        const json =await  data.json();
      //optional chaining 
        setListofRestaurant(
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setFilteredRestaurant(
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );
      };
      return listofRestaurants.length=== 0 ? (
        <Shimmer/>
      ): (
       <div className="body">
           <div className="filter">
            <div className="search">
            <input type="text"
            className="search-box"
             value={searchText}
             onChange={(e)=>{
              setSearchText(e.target.value);
             }}
             />
            <button onClick={() =>{
            // filter the restraurant cards and update the UI
            // search text
            console.log(searchText);

            const filteredRestaurant= listofRestaurants.filter( (res) => 
             res.info.name.toLowerCase().includes(searchText.toLowerCase()) 
              );
              setFilteredRestaurant(filteredRestaurant);

            }}
            >Search</button>
            </div>
            <button className="filter-btn"
             onClick={() => {
              const filteredList = listofRestaurants.filter(
                (res) => res.info.avgRating > 4
                 ); 
                 setListofRestaurant(filteredList);
              } }
            >
                Top Rated Restaurants
                </button>
           </div>
           <div className="res-container">
          {filteredRestaurant.map((restaurant) => (
           <RestaurantCard key={restaurant.info.id} resData ={restaurant}/>       
           ))}
       </div>
       </div>
    );
   }; 

   export default Body;

