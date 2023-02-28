import * as React from 'react';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ScheduleIcon from '@mui/icons-material/ScheduleTwoTone';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicketTwoTone';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotesTwoTone';
import InsertChartIcon from '@mui/icons-material/InsertChartTwoTone';
import GroupsIcon from '@mui/icons-material/GroupsTwoTone';

export const mainListItems = (
  <React.Fragment>
    <Link to={"/"}>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="메인으로" />
      </ListItemButton>
    </Link>
    <Link to={"/schedule"}>
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="근무기록" />
      </ListItemButton>
    </Link>
    <Link to={"/attendance"}>
      <ListItemButton>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="출퇴근관리" />
      </ListItemButton>
    </Link>
    <Link to={"/dayoff"}>
    <ListItemButton>
      <ListItemIcon>
        <AirplaneTicketIcon />
      </ListItemIcon>
      <ListItemText primary="휴가" />
    </ListItemButton>
    </Link>
    <Link to={"/board"}>
      <ListItemButton>
        <ListItemIcon>
          <SpeakerNotesIcon />
        </ListItemIcon>
        <ListItemText primary="게시판" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <Link to={"/department"}>
      <ListItemButton>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="조직도" />
      </ListItemButton>
    </Link>
    <Link to={"/statistics"}>
    <ListItemButton>
      <ListItemIcon>
        <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="근태통계" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);