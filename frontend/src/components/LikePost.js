import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikePost = ({isLike, handleLike,handleUnLike}) =>{
    return (
        <div>
           {
               isLike 
               ? <FavoriteIcon onClick={handleUnLike} style={{color:'purple'}}/>
               : <FavoriteIcon onClick={handleLike} style={{color:'black'}}/>

           }
        </div>
    )
}

export default LikePost;