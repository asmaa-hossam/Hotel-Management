import React from 'react'
import Grid from "@mui/material/Grid";
import { Container, Box, Paper, containerClasses } from "@mui/material";
import Typography from "@mui/material/Typography";
import logo from '../../../../assets/images/Staycation..svg'
import Divider from "@mui/material/Divider";



export default function MyComponent() {

    
  return (

 <Container  sx={{}}> 
  <Divider sx={{ borderColor: " #E5E5E5",height:"1px"}} />

<Box  sx={{display:"flex",alignItems:"center",justifyContent: "space-between",mt:5, width: "100%"}}>
 <Box
      sx={{               
       
      
        justifyContent: "flex-end", 
   
    
      }}
    >
  <Typography ><img src={logo} alt="" /></Typography>
  <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
   width:"258px",
   height:"24px"
}}>We kaboom your beauty holiday
</Typography>
      
       <Typography variant="body1" 
    sx={{
  fontFamily: "Poppins",
  color:"#B0B0B0",
 width:"258px",
   height:"24px",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",  
  letterSpacing: "0em", 
}}>
  instantly and memorable.</Typography>

    </Box>

    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Box
      sx={{             
        p: 2,
        justifyContent: "center", 
      }}
    >


            <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:" #152C5B",
   width:"137px",
   height:"24px"
}}>For Beginners
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
   width:"105px",
   height:"24px"
}}>New Account
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
    width:"170px",
   height:"24px"
}}>Start Booking a Room
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
    width:"112px",
   height:"24px"
}}>Use Payments
</Typography>
      
    </Box>

    

  <Box
      sx={{
                       
        p: 2,
        justifyContent: "center", // center horizontally
      }}
    >
               <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:" #152C5B",
   width:"137px",
   height:"24px"
}}>Explore Us
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
   width:"105px",
   height:"24px"
}}>Our Careers
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
    width:"170px",
   height:"24px"
}}>Privacy
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
    width:"112px",
   height:"24px"
}}>Terms & Conditions
</Typography>
    </Box>

  <Box
      sx={{
                       
        p: 2,
        justifyContent: "center", 
      }}
    >
   <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:" #152C5B",
   width:"137px",
   height:"24px"
}}>Connect Us
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
   width:"179px",
   height:"24px"
}}>support@staycation.id
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
    width:"131px",
   height:"24px"
}}>021 - 2208 - 1996
</Typography>
      <Typography variant="body1" 
  sx={{
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "100%",   
  letterSpacing: "0em", 
   color:"#B0B0B0",
    width:"322px",
   height:"24px"
}}>Staycation, Kemang, Jakarta
</Typography>
    </Box>
<Box>

</Box>



  </Box>


 
 
 
 
 
</Box>
 
<Box sx={{  textAlign: "center", p: 2 }}>
  <Typography
    variant="body1"
    sx={{
      fontFamily: "Poppins",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0em",
      color: "#B0B0B0",
    }}
  >
    Copyright 2019 • All rights reserved • Staycation
  </Typography>
</Box>



</Container>
    

    
  );
}

 


// import React from "react";
// import { Container, Box, Typography, Divider } from "@mui/material";
// import logo from "../../../../assets/images/Staycation..svg";
// import { Grid } from "@mui/material";

// export default function Footer() {
//   return (
//     <Container>
//       <Divider sx={{ borderColor: "#E5E5E5", mb: 4 }} />

//       <Grid container spacing={10}>
//         {/* Logo + text */}
//         <Grid xs={12} md={4}>
//           <Box>
//             <img src={logo} alt="Staycation" />
//             <Typography
//               sx={{
//                 fontFamily: "Poppins",
//                 fontWeight: 300,
//                 fontSize: "16px",
//                 color: "#B0B0B0",
//                 mt: 2,
//                 width:"258px"
//               }}
//             >
//               We kaboom your beauty holiday 
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "Poppins",
//                 fontWeight: 300,
//                 fontSize: "16px",
//                 color: "#B0B0B0",
//                 mt: 2,
//                 width:"258px"
//               }}
//             >
//            instantly and memorable.
//             </Typography>
//           </Box>
//         </Grid>



//         {/* Column 1 */}
//         <Grid xs={6} md={2}>
//           <Typography
//             sx={{ fontFamily: "Poppins", fontWeight: 500, color: "#152C5B", mb: 2,fontsize:"18px",height:"24px"  }}
//           >
//             For Beginners
//           </Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>New Account</Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Start Booking a Room</Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Use Payments</Typography>
//         </Grid>

//         {/* Column 2 */}
//         <Grid xs={6} md={2}>
//           <Typography
//             sx={{ fontFamily: "Poppins", fontWeight: 500, color: "#152C5B", mb: 2 ,fontsize:"18px",height:"24px" }}
//           >
//             Explore Us
//           </Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Our Careers</Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px" ,height:"24px" }}>Privacy</Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Terms & Conditions</Typography>
//         </Grid>

//         {/* Contact */}
//         <Grid xs={12} md={3}>
//           <Typography
//             sx={{ fontFamily: "Poppins", fontWeight: 500, color: "#152C5B", mb: 2 }}
//           >
//             Connect Us
//           </Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px" }}>support@staycation.id</Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>021 - 2208 - 1996</Typography>
//           <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>
//             Staycation, Kemang, Jakarta
//           </Typography>
//         </Grid>
//       </Grid>

//       {/* Footer bottom */}
//       <Box sx={{ textAlign: "center", mt: 4, p: 2 }}>
//         <Typography
//           sx={{
//             fontFamily: "Poppins",
//             fontWeight: 300,
//             fontSize: "16px",
//             color: "#B0B0B0",
//           }}
//         >
//           Copyright 2019 • All rights reserved • Staycation
//         </Typography>
//       </Box>
//     </Container>
//   );
// }

      


