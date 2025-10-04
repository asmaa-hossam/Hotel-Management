
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useAuthContext } from "../../../../Context/Context"
import logo from "../../../../assets/images/Staycation..svg"

export default function Navbar() {
  const { loginData } = useAuthContext();

  return (
    <AppBar position="static" sx={{width:"95%",margin:"auto",bgcolor:"#F8F9FB",borderRadius:"20px"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left: Email */}
        <Box>
         <img src={logo} alt="" />
        </Box>

  

        {/* Right: Role   */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2,color:"black" }}>
          {loginData && (
            <>
              <Typography variant="body1" color="inherit">
                {loginData.role}
              </Typography>
               
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}
