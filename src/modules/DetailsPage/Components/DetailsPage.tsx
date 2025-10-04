import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosinstance, USERS_URL } from '../../../services/urls'
import  type {ResRoomDetails,RoomsData}from '../../../services/interfaces'
import { toast } from 'react-toastify'
import {Box, CircularProgress, Grid, Stack, styled, Typography,} from "@mui/material";
import roomImg1 from "../../../assets/images/room-img1.png";
import roomImg2 from "../../../assets/images/room-img2.png";
import roomImg3 from "../../../assets/images/room-img3.png";
import img1 from "../../../assets/images/ic_bedroom.svg";
import img2 from "../../../assets/images/ic_ac 1.svg";
import img3 from "../../../assets/images/ic_diningroom 1.svg";
import img4 from "../../../assets/images/ic_kulkas.svg";
import img5 from "../../../assets/images/ic_livingroom.svg";
import img6 from "../../../assets/images/ic_tv.svg";
import img7 from "../../../assets/images/ic_wifi 1.svg";
import img8 from "../../../assets/images/ic_bedroom (1).svg";
import BookingDetails from '../../UsersPortal/Components/UsersShared/BookingDetails/BookingDetails'
import { useAuthContext } from '../../../Context/Context'
import ReviewForm from '../../UsersPortal/Components/ReviewForm/ReviewForm'
import CommentForm from '../../UsersPortal/Components/CommentForm/CommentForm'
import { useTranslation } from 'react-i18next'

const StyleBox=styled(Box)(()=>({

  display:'flex',
  width:"90%",
  marginInline:"auto",
  mb:"2rem"
}))
export default function DetailsPage() {
   const { t } = useTranslation("details")
  
  // const isRTL = i18n.language === 'ar'
  let {loginData}=useAuthContext()
  let [roomDetails,setRoomDetails]=useState<RoomsData>()
  let {roomid}=useParams()
  let [loading,setLoading]=useState(false)
  let ImgsStyles={
    borderRadius: '1rem',
    width:'100%',
    height:'100%',
    objectFit: 'cover' as const
  }

  const facilitiesData = [
    { icon: img1, number: 5, name: "bed room" },
    { icon: img2, number: 1, name: "living room" },
    { icon: img3, number: 3, name: "bath room" },
    { icon: img4, number: 1, name: "dining room" },
    { icon: img5, number: 10, name: "mbp/s" },
    { icon: img6, number: 7, name: "unit ready" },
    { icon: img7, number: 2, name: "refrigrator" },
    { icon: img8, number: 4, name: "television" },
  ];

  const GETROOMDETAILS= async()=>{
    try{
      setLoading(true)
      let res= await axiosinstance.get<ResRoomDetails>(USERS_URL.GETROOMDETAILS(roomid!))
      console.log(res);
      setRoomDetails(res.data.data.room)
    }
    catch(error){
      console.log(error);
      toast.error("Failed to fetch room");
    }finally{
      setLoading(false)
    }
  }  

  useEffect(() => {
    GETROOMDETAILS();
  }, [roomid]);

  return (
    <>
      <Box sx={{ 
        maxWidth: "1200px", 
        marginInline: "auto",
        paddingInline: { xs: "1rem", md: "2rem" },
        paddingTop: "2rem"
      }}>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
            <CircularProgress />
          </Box>
        )}
        
        {!loading && (
          <Box
         
          >
            {/* Breadcrumb */}
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#B0B0B0", 
                marginBottom: "1rem",
                fontSize: "14px"
              }}
            >
              {t("breadcrumb")}
            </Typography>

            {/* Room Title */}
            <Typography 
              variant="h4" 
              sx={{ 
                color: "#152C5B", 
                fontWeight: "600",
                marginBottom: "2rem",
                fontSize: { xs: "24px", md: "32px" },
                textAlign:"center"
              }}
            >
              {roomDetails?.roomNumber || "Village Angga"}
            </Typography>

            {/* Images Grid */}
            <Grid container spacing={2} sx={{minHeight:"500px", marginBlock: "3.125rem"}}>
              {/* First child grid */}
              <Grid size={{sm:12,md:6}} sx={{gridRow:2 }}>
                {roomDetails?.images[0] ? (
                  <img src={roomDetails.images[0]} style={ImgsStyles}/>
                ) : (
                  <img src={roomImg1} style={ImgsStyles}/>
                )}
              </Grid>
              
              {/* Second child grid */}
              <Grid container spacing={2} size={{ sm: 12, md: 6 }}>
                <Grid size={12}>
                  {roomDetails?.images[1] ? (
                    <img src={roomDetails?.images[1]} style={ImgsStyles}/> 
                  ) : (
                    <img src={roomImg2} style={ImgsStyles}/>
                  )}
                </Grid>
                <Grid size={12}>
                  {roomDetails?.images[2] ? (
                    <img src={roomDetails?.images[2]} style={ImgsStyles}/> 
                  ) : (
                    <img src={roomImg3} style={ImgsStyles}/>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Content Section */}
            <Grid container spacing={2}>
              {/* Left Content */}
              <Grid size={{xs:12,sm:6}}>
                {/* Description */}
                <Typography
                  sx={{ 
                    textAlign: "start", 
                    color: "#B0B0B0",
                    lineHeight: 1.6,
                    marginBottom: "2rem",
                    fontSize: "14px"
                  }}
                >
                  Minimal techno is a minimalist subgenre of techno music. It is
                  characterized by a stripped-down aesthetic that exploits the use
                  of repetition and understated development. Minimal techno is
                  thought to have been originally developed in the early 1990s by
                  Detroit-based producers Robert Hood and Daniel Bell.
                  <br/><br/>
                  Such trends saw the demise of the soul-infused techno that
                  typified the original Detroit sound. Robert Hood has noted that he
                  and Daniel Bell both realized something was missing from techno in
                  the post-rave era.
                  <br/><br/>
                  Design is a plan or specification for the construction of an
                  object or system or for the implementation of an activity or
                  process, or the result of that plan or specification in the form
                  of a prototype, product or process. The national agency for
                  design: enabling Singapore to use design for economic growth and
                  to make lives better.
                </Typography>

                {/* Facilities */}
                <Box
                  display="flex"
                  gap="1rem  3rem"
                  flexWrap="wrap"
                  sx={{mt:"2rem" }}
                  
                >
                  {facilitiesData.map((facility) => (
                    <Stack  textAlign="start" alignItems="center" key={facility.name}>
                      <Box width="30px" height="30px" sx={{alignSelf:"self-start"}}>
                        <img src={facility.icon} style={ImgsStyles}/>
                      </Box>
                      <Typography
                        variant="body1"
                        component="span"
                        // sx={{marginInlineStart:"2.5rem"}}
                      >
                        <Box
                          sx={{ color: "#152C5B" , marginBlockStart: "1rem"}}
                          component="span"
                        >
                          {facility.number}
                        </Box>{" "}
                       <span style={{color:"#B0B0B0"}}> {facility.name}</span>
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Grid>
              
              {/* Right Side - Booking Section  */}
             <Grid size={{xs:12,sm:6}}  >
              
            <BookingDetails roomId={roomDetails?._id!} totalPrice={roomDetails?.price!} capacity={roomDetails?.capacity!}/>

             </Grid>

            </Grid>
          </Box>
        )}

{loginData?.role==="user"?<StyleBox
  sx={{
    
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: {
              xs: "3rem",
              md: "2rem",
              lg: "5rem",
            },
            paddingX: {
              xs: "1rem",
              sm: "5.25rem",
            },
            paddingY: "35px",
          }}
>
<ReviewForm roomId={roomDetails?._id!}/>
<CommentForm roomId={roomDetails?._id!}/> 
</StyleBox>
:""
}

      </Box>


    </>
  )
}