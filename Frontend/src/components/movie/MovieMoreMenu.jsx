import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { deleteUser } from "../../redux/actions/Users";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser, resetUpdate } from "../../redux/actions/Auth";
import { deleteMovie } from "../../redux/actions/Movie";

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const history = useHistory();
  let location = useLocation();
  const { loadingDeleteMovie } = useSelector((state) => state.MovieReducer);
  const { successGetDetailUser } = useSelector((state) => state.AuthReducer);
  // useEffect(() => {
  //   if (successGetDetailUser) {
  //     history.push("/admin/users/edit");
  //   }
  // }, [successGetDetailUser]);

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // xóa một user
  const handleDeleteOne = (_id) => {
    if (loadingDeleteMovie) {
      // nếu click xóa liên tục một user
      return;
    }
    dispatch(deleteMovie(_id));
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "rgb(255, 72, 66);" }}
          onClick={(e) => handleDeleteOne(props.keyItemId)}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Xoá"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "rgb(33, 43, 54)" }}
          // onClick={(e) => handleEditDetail(props.keyItemId)}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Chỉnh sửa"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
