import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, logoutUser } from "../_actions/user_actions";
import Timer from "./Timer";
import decode from "jwt-decode";
import ModalComponent from "./ModalComponent";
import SettingsIcon from '@mui/icons-material/Settings';

import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { mainListItems, secondaryListItems } from './Listitem';
import { Alert, Badge, Button, Fade, FormControlLabel, FormGroup, Popper, Stack, Switch } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import { width } from '@mui/system';
import axios from 'axios';
import MailIcon from '@mui/icons-material/Mail';


import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = window.localStorage.getItem("Authorization");
  const token = authorization ? decode(authorization) : null;
  const [User, setUser] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);




  const {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    unreadCount
  } = useNotificationCenter();

  const user = useSelector(state => state.user);
 
  useEffect(() => {
    if (user.userData && token) {
      setUser(user.userData.data);
    } else if (!!user && !!token) {
      dispatch(auth(token.userId))
        .then(res =>
          // console.log(res.payload.data)
          res.payload.data
        );
    }
  }, [user]);

  const logoutHandler = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem("Authorization");
    navigate("/login"); 
    console.log(user.userData);
  };

  const ShowModalHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const toggleNotificationCenter = (e) => {
    setAnchorEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const reAuth = () => {
    if(!!user && !!token) {
      dispatch(auth(token.userId))
        .then(res => console.log(res.payload.data));
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  /** ???????????? START **/
  const [alarmList, setAlarmList] = useState(null);
  const [alCount, setAlCount] = useState(null);

  const alarmCheck = async (e) =>{
    await axios.get("/api/sse/update/" + e.no)
  }

  const alarmCount = async () =>{
    if(user && user.userData){
      await axios.get("/api/sse/count/" + user.userData.data.no).then((res)=>{
        setAlCount(res.data.data.count)
      })  
    }
  }


  useEffect(()=>{
    if(user && user.userData && user.userData.data && user.userData.data.level === '??????') {
      alarmCount();
      var es = new EventSource("/api/sse/" + user.userData.data.no);
      es.onopen = function (event) {
          // console.log("????????? ?????????????????????.")
      };
      es.onmessage = function (event) {
        var data = JSON.parse(event.data);
        // setTimeout(() => {
        //   setAlarmList(data)
        // }, 1000);
        setAlarmList(data)
      };
      es.addEventListener('error', ()=>{ es.close})
      es.close();
      es = function(e) {
          if(e.eventPhase=='2'){
              console.log('???????????? ????????? ???????????????.');
          }else {
              console.log('????????? ??????????????????.');
          }
      }

    }
  },[user])





  // //////////////////////
  // const [alarm,setAlarm] = useState(false)
  // useEffect(()=>{
  //   if(user && user.userData && user.userData.data.level === '??????') {

  //     // ????????? SSE
  //     if(alarm){
  //       var eventSource = new EventSource(`/api/sse/alarm/${user.userData.data.no}`)
    
  //       eventSource.addEventListener( 'message',e=>{
  //         let data = JSON.parse(e.data);
  //         console.log(e.data)
  //         if ( data > 0 ){
  //           toast("????????? ????????????.")
  //           axios.get(`/api/sse/alarm/reset/${user.userData.data.no}`);
  //         }



  //       })
    
    
  //       eventSource.addEventListener('error', e=>{
  //         eventSource.close();
  //         console.log('????????? ??????????????????')
  //       })
  //     }
  //     setAlarm(true)
  //   }
  // },[user,alarm])


  // console.log(alarm)

  

  ////////////////////




  useEffect(()=>{
    alarmCount();
  }, [alarmList])

  /** ???????????? END **/







  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{float: "right", background: "linear-gradient(107deg, #00a4ed 10%, #1471ef 89%)"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" noWrap component="div" style={{width: "100%", height: "100%"}}>
              WETHEGO / ?????? ?????? ?????????
            </Typography>
          <Stack required spacing={2} direction="row" style={{width: "25%", height: "100% ", textAlign: "center", alignItems: "center"}}>  
            <Timer noWrap component="div" />
            <Typography noWrap component="div">
              { User && User.level === '??????' ?
                    <Link to="/admin" className="nav-link" style={{ fontWeight: "bold" }}>
                      {User && User.name}
                    </Link>
                    :
                    <a className="nav-link" style={{ fontWeight: "bold" }}>
                      {User && User.name}
                    </a>
              }
            </Typography>
            { user && user.userData && user.userData.data && user.userData.data.level === '??????' ?
                <IconButton size="small" onClick={toggleNotificationCenter}>
                <Badge badgeContent={alCount} color="error">
                    <NotificationsIcon style={{color: "white"}}/>
                </Badge>
              </IconButton>
             : null }

              <Popper open={isOpen} anchorEl={anchorEl} transition style={{zIndex: "9999"}}>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box>
                      <Box
                        sx={{
                          background: "#666",
                          padding: "25px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h5" color="#fff">
                          ?????? ??????
                        </Typography>
                      </Box>
                      <Stack
                        sx={{
                          height: "400px",
                          width: "min(60ch, 100ch)",
                          padding: "12px",
                          background: "#f1f1f1",
                          borderRadius: "8px",
                          overflowY: "auto"
                        }}
                        spacing={2}
                      >
                        {/* {(!notifications.length ||
                          (unreadCount === 0 && showUnreadOnly)) && (
                          <h4>
                            ????????? ????????? ????????????{" "}
                            <span role="img" aria-label="dunno what to put">
                              ????
                            </span>
                          </h4>
                        )} */}
                        {alarmList ? alarmList.map((e,i)=>(
                          <div className="alarmList">
                            <Link to="/dayoff/request">
                            <div onClick={() => {
                            alarmCheck(e)
                            setIsOpen(!isOpen)
                            }
                            } className="alarm" key={e.no} ><span className="alarm2">???? {e.name}</span> ?????? <span className="alarm2">{e.vlist}</span> ?????? ????????? ????????????.</div>
                            </Link>
                          </div>
                        )) : null }

                      </Stack>
                      <Box
                        sx={{
                          background: "#666",
                          padding: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        {/* <Button variant="contained" onClick={clear}>
                          ?????? ?????????
                        </Button>

                        <Button variant="contained" onClick={markAllAsRead}>
                          ?????? ?????? ??????
                        </Button> */}
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Popper>
            <Typography style={{cursor: 'pointer'}} noWrap component="div" onClick={ShowModalHandler}>
              <i className="fas fa-cog"></i>
            </Typography>
            <a className="nav-link" href="#" style={{ fontWeight: "bold" }} onClick={logoutHandler}>
              ????????????
            </a>
          </Stack>
          <ModalComponent show={ShowModal} user={ user.userData ? user.userData.data : null} callback={(e) => e ? (setShowModal(false), logoutHandler()) : (setShowModal(false), reAuth())} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <List component="nav">
            {mainListItems}
          <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </List>
        <Divider />
      </Drawer>



    </Box>
  );
}
