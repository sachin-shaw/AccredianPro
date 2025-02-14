import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaChevronDown } from "react-icons/fa";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='demo-positioned-button'
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span className='flex items-center gap-1 px-3 py-2 rounded-md bg-[#1A73E8] text-white'>
          Courses
          <FaChevronDown />
        </span>
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          Professional Certificate Program in Product Management
        </MenuItem>
        <MenuItem onClick={handleClose}>
          PG Certificate Program in Strategic Product Management
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Executive Program in Data Driven Product Management
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Executive Program in Product Management and Digital Transformation
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Executive Program in Product Management
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Advanced Certification in Product Management
        </MenuItem>
      </Menu>
    </div>
  );
}
