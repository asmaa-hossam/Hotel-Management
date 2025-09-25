import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { axiosinstance, USERS_URL } from '../../../services/urls'
import { useEffect, useState } from 'react'
import  type {ResRoomData,RoomsData}from '../../../services/interfaces'
import roomimg from '../../../assets/images/room.png'
export default function ExplorPage() {
    const [loading, setLoading] = useState<boolean>(false);
      const [availableRooms, setAvailableRooms] = useState<RoomsData[]>([]);

let [URLSearchParams]=useSearchParams()
let startDate=URLSearchParams.get("startDate")
let endDate=URLSearchParams.get("endDate")

const getRooms= async()=>{
  try{
    setLoading(true)
 let res= await axiosinstance.get<ResRoomData>(USERS_URL.GETALLROOMS,
  {
    params:{
      startDate,
      endDate
    }
  }
 )
 console.log(res.data);
 setAvailableRooms(res?.data?.data?.rooms)
  }
  catch(error){
console.log(error);

  }
  finally{
    setLoading(false)
  }
}
useEffect(()=>{
getRooms()
},[startDate,endDate])


  return (
    <>

     <Typography
        variant="h4"
        sx={{ color: "#152C5B", textAlign: "center", fontWeight: "600", mt: "50px",mb:'30px' }}
      >
        Explore ALL Rooms
     </Typography>

    {loading&& <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
              sx={{
                marginBlock: "2rem",
                color: "blue",
              }}
              size={"15rem"}
            />
          </Box>}

          <Grid container columns={{xs:2,sm:8,md:12}} spacing={2}
          sx={{p:5}}
          >
            {!loading&&availableRooms.length>0&&availableRooms.map((roomItem,index)=>(
           <Grid key={index} size={{xs:2,sm:4,md:4}}>
          <Box sx={{width:"100%",height:"250px",borderRadius: "15px",position:"relative"}}>
          <img
          src={roomItem.images[0]?roomItem.images[0]:roomimg}
          alt='roomImg'
          style={{
                        width: "100%",
                        height: "100%",
                        borderRadius:"15px"
                      }}
          />
          <Box
         sx={{
          position:"absolute",
                      top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6))",
                        zIndex: 1,
         }}
          >
            <Typography sx=
            {{bgcolor:"#FF498B",width:"180px",height:"40px",borderTopRightRadius:"15px",
              borderBottomLeftRadius:"15px",position:"absolute",top:0,right:0,textAlign:"center",  color: "#FFFFFF",
                        fontWeight: "500",
                        fontSize: "16px",
                      padding: "10px 15px",
                      lineHeight:"1,7"
            }}>
              ${roomItem.price}
              <span  style={{ fontWeight: "300" }}>Per night</span>
            </Typography>
            <Typography
                      variant="h5"
                      sx={{
                        position: "absolute",
                        color: "#FFFFFF",
                        fontWeight: "400",
                        bottom: "3.5rem",
                        left: "1.5rem",
                        fontSize: "20px",
                        zIndex: 2,
                      }}
                    >
                      Ocean Land
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        position: "absolute",
                        color: "#FFFFFF",
                        fontWeight: "300",
                        bottom: "2rem",
                        left: "1.5rem",
                        fontSize: "15px",
                        zIndex: 2,
                      }}
                    >
                      Bandung, Indonesia
                    </Typography>

          </Box>
          </Box>
           </Grid>
            ))
            
            }
            
            </Grid>
    </>
  )
}
