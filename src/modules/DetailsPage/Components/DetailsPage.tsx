import React from 'react'
import CommentForm from '../Components/Comments/CommentForm';
import RoomComments from'./Comments/RoomComments'
export default function DetailsPage() {




 const roomId= "500"


  return (
    <div>
      <h2>Post Details</h2>
     <RoomComments roomId={roomId} />
    </div>
  );


}
  