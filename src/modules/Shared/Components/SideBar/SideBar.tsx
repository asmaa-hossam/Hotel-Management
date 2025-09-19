import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'
import React, { useState } from 'react'
import {
  Home, 
  Group, 
  BedroomParent, 
  CalendarMonth, 
  Style, 
  JoinFull, 
  LockOpen, 
  Logout,
  ChevronLeft,
  ChevronRight,
  Menu
} from '@mui/icons-material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../Context/Context'

export default function SideBar() {
  let {logOut}=useAuthContext()
  let navigate=useNavigate()
  let { pathname } = useLocation()
  let [open, setOpen] = useState(true)
  let theme = useTheme()
  let isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  let ToggleOpenDrawer = () => {
    setOpen(!open)
  }
  
  let handleDrawerClose = () => {
    if (isMobile) {
      setOpen(false)
    }
  }
  let handleLogOUt=()=>{
    logOut()
    navigate('/login')
  }
  
  let menuItems = [
    { text: "Home", Icon: <Home />, path: '/dashboard' },
    { text: "Users", Icon: <Group />, path: '/users' },
    { text: "Rooms", Icon: <BedroomParent />, path: '/rooms' },
    { text: "Ads", Icon: <CalendarMonth />, path: '/advertisments' },
    { text: "Booking", Icon: <Style />, path: '/bookingg' },
    { text: "Facilities", Icon: <JoinFull />, path: '/facilities' },
    { text: "Change Password", Icon: <LockOpen />, path: '/changePassword' },
  ]
  
  return (
    <>
      {isMobile && !open && (
        <IconButton
          onClick={ToggleOpenDrawer}
          sx={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 1300,
            bgcolor: 'rgba(32, 63, 199, 1)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(32, 63, 199, 0.8)',
            }
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer 
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor='left' 
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: open ? 240 : (isMobile ? 0 : 70),
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? 240 : (open ? 240 : 70),
            boxSizing: "border-box",
            transition: 'width 0.3s ease-in-out',
            overflow: 'hidden'
          },
        }}
      >
        <Box 
          sx={{ 
            height: '64px', 
            bgcolor: 'rgba(32, 63, 199, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            px: open ? 2 : 1,
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <IconButton 
            onClick={ToggleOpenDrawer}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {open ? <ChevronLeft /> : (isMobile ? <ChevronLeft /> : <ChevronRight />)}
          </IconButton>
        </Box>

        <List 
          sx={{
            minHeight: "calc(100vh - 64px)",
            bgcolor: "rgba(32, 63, 199, 1)",
            pt: 2,
            px: open ? 2 : 1
          }}
        >
          {menuItems.map((item, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                px: 0,
                mb: 0.5
              }}
            >
              <ListItemButton  
                component={Link}
                to={item.path}
                selected={item.path === pathname}
                onClick={() => isMobile && setOpen(false)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: open ? 2 : 1.5,
                  borderRadius: '8px',
                  "&:hover": {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  "&.Mui-selected": {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    "&:hover": {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: "white",
                    fontSize: '20px'
                  }}
                >
                  {item.Icon}
                </ListItemIcon>
                
                {open && (
                  <ListItemText 
                    primary={item.text} 
                    sx={{
                      color: "white",
                      '& .MuiListItemText-primary': {
                        fontSize: '14px',
                        fontWeight: 400
                      }
                    }} 
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
          
          <ListItem 
            sx={{ 
              px: 0,
              mt: 'auto',
              mb: 2
            }}
          >
            <ListItemButton  
              onClick={() => {
                isMobile && setOpen(false)
                handleLogOUt()
              }}

              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: open ? 2 : 1.5,
                borderRadius: '8px',
                "&:hover": {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon 
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: "white"
                }}
              >
                <Logout />
              </ListItemIcon>
              
              {open && (
                <ListItemText 
                  primary="Logout" 
                  sx={{
                    color: "white",
                    '& .MuiListItemText-primary': {
                      fontSize: '14px',
                      fontWeight: 400
                    }
                  }} 
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}