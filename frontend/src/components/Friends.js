import React from "react";
import FriendsCard from "./FriendsCard";

const Friends = ({userData, profile, auth, id}) =>{
    console.log({userData})
    return(  
        <div>
            {userData.length > 0 && userData.map(user => (
                <FriendsCard user={user.friends} key={user._id}/>
            ))}
        </div>
    )
}
export default Friends;