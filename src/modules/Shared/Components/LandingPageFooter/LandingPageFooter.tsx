
import React from "react";
import { Container, Box, Typography, Divider } from "@mui/material";
import logo from "../../../../assets/images/Staycation..svg";
import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Container>
      <Divider sx={{ borderColor: "#E5E5E5", mb: 4 }} />

      <Grid container spacing={10}>
        {/* Logo + text */}
        <Grid  sx = {{xs:12 ,md :"4"}}>
          <Box>
            <img src={logo} alt="Staycation" />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 300,
                fontSize: "16px",
                color: "#B0B0B0",
                mt: 2,
                 width:"270px",
                textAlign:"left"
              }}
            >
              We kaboom your beauty holiday <br />
                instantly and memorable.
            </Typography>
       
          </Box>
        </Grid>



        {/* Column 1 */}
        <Grid     sx= {{xs:"6", md:"2"}}>
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: 500, color: "#152C5B", mb: 2,fontsize:"18px",height:"24px"  }}
          >
            For Beginners
          </Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>New Account</Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Start Booking a Room</Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Use Payments</Typography>
        </Grid>

        {/* Column 2 */}
        <Grid xs={6} md={2}>
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: 500, color: "#152C5B", mb: 2 ,fontsize:"18px",height:"24px" }}
          >
            Explore Us
          </Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Our Careers</Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px" ,height:"24px" }}>Privacy</Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>Terms & Conditions</Typography>
        </Grid>

        {/* Contact */}
        <Grid xs={12} md={3}>
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: 500, color: "#152C5B", mb: 2 }}
          >
            Connect Us
          </Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px" }}>support@staycation.id</Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>021 - 2208 - 1996</Typography>
          <Typography sx={{ color: "#B0B0B0",fontFamily: "Poppins", fontWeight: 300, mb: 2 ,fontsize:"18px",height:"24px"  }}>
            Staycation, Kemang, Jakarta
          </Typography>
        </Grid>
      </Grid>

      {/* Footer bottom */}
      <Box sx={{ textAlign: "center", mt: 4, p: 2 }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: "16px",
            color: "#B0B0B0",
          }}
        >
          Copyright 2019 • All rights reserved • Staycation
        </Typography>
      </Box>
    </Container>
  );
}

      


