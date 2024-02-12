import RestaurantCard from "./RestaurantCard";
import { useState , useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  
  //local state variable - super powerful variable
  const[listofRestaurants ,setListofRestaurant] = useState([]);
  const[filteredRestaurant ,setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
//whenever state variables update , react triggers a reconcilation cycle (re-renders the components)
console.log("Body Rendered" );

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
      
      const onlineStatus = useOnlineStatus();

      if(onlineStatus === false)
      return(
    <h1>
      Look like you're offline!! Please check your internet connection;
    </h1>
        )

      return listofRestaurants.length=== 0 ? (
        <Shimmer/> 
      ): (
       <div className="body">
           <div className="filter flex">
            <div className="search m-4 p-4">
            <input type="text"
            className="border border-solid border-black"
             value={searchText}
             onChange={(e)=>{
              setSearchText(e.target.value);
             }}
             />
            <button className="px-4 py-2 bg-green-400 m-4 rounded-lg"
             onClick={() =>{
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
            <div className="search m-4 p-4 flex items-center ">
            <button className="px-4 py-2 bg-gray-400 rounded-lg"
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
           </div>
           <div className="flex flex-wrap">
          {filteredRestaurant.map((restaurant) => (
          <Link
          key={restaurant.info.id} 
          to={"/restaurants/"+restaurant.info.id} 
          >
          <RestaurantCard  resData ={restaurant}/> 
          </Link>      
           ))}
       </div>
       </div>
    );
   }; 

   export default Body;

