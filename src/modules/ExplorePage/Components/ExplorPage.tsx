import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { axiosinstance, USERS_URL } from '../../../services/urls'
import { useEffect, useState } from 'react'
import  type {ResRoomData,RoomsData}from '../../../services/interfaces'
import roomimg from '../../../assets/images/room.png'

export default function ExplorePage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [availableRooms, setAvailableRooms] = useState<RoomsData[]>([]);

    let [URLSearchParams] = useSearchParams()
    let startDate = URLSearchParams.get("startDate")
    let endDate = URLSearchParams.get("endDate")

    const getRooms = async() => {
        try {
            setLoading(true)
            let res = await axiosinstance.get<ResRoomData>(USERS_URL.GETALLROOMS, {
                params: {
                    startDate,
                    endDate
                }
            })
            console.log(res.data);
            setAvailableRooms(res?.data?.data?.rooms)
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRooms()
    }, [startDate, endDate])

    return (
        <>
            <Typography
                variant="h4"
                sx={{ 
                    color: "#152C5B", 
                    textAlign: "center", 
                    fontWeight: "600", 
                    mt: "50px", 
                    mb: '30px' 
                }}
            >
                Explore ALL Rooms
            </Typography>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress
                        sx={{
                            marginBlock: "2rem",
                            color: "blue",
                        }}
                        size={"15rem"}
                    />
                </Box>
            )}

            <Grid 
                container 
                columns={{xs: 2, sm: 8, md: 12}} 
                spacing={3}
                sx={{ p: 5 }}
            >
                {!loading && availableRooms.length > 0 && availableRooms.map((roomItem, index) => (
                    <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                        <Box 
                            sx={{
                                width: "100%",
                                height: "280px",
                                borderRadius: "20px",
                                position: "relative",
                                overflow: "hidden",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
                                }
                            }}
                        >
                            <img
                                src={roomItem.images[0] ? roomItem.images[0] : roomimg}
                                alt='roomImg'
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "20px"
                                }}
                            />
                            
                            {/* الطبقة المتدرجة */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%)",
                                    borderRadius: "20px",
                                    zIndex: 1,
                                }}
                            />

                            {/* بطاقة السعر */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "0px",
                                    right: "0px",
                                    bgcolor: "#FF498B",
                                     borderRadius: "0px 15px",

                                    px: 4,
                                    py: 0.8,
                                    zIndex: 2,
                                    backdropFilter: "blur(10px)",
                                    boxShadow: "0 4px 12px rgba(255, 73, 139, 0.3)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minHeight: "50px"
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        lineHeight: 1.1,
                                        margin: 0
                                    }}
                                >
                                    ${roomItem.price} 
                                    <span> Per night</span>
                                </Typography>
                               
                            </Box>

                            {/* معلومات الغرفة */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 3,
                                    zIndex: 2,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#FFFFFF",
                                        fontWeight: "600",
                                        fontSize: "22px",
                                        mb: 1,
                                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
                                    }}
                                >
                                    Ocean Land
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        opacity: 0.9,
                                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)"
                                    }}
                                >
                                    Bandung, Indonesia
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}