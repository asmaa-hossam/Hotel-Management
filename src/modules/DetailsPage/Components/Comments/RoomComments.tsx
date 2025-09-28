import TextareaBox from './CommentForm'; 


type RoomCommentsProps = {
  roomId: string ; 
};

export default function RoomComments({ roomId }: RoomCommentsProps) {
  return (
    <div style={{ padding: 16 }}>
      <h2>Room Comments</h2>
      <TextareaBox
        id={roomId}
      />
    </div>
  );
}

