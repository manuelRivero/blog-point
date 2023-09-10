import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomInput from "../../shared/customInput";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

interface Category {
  _id: string;
  name: string;
}
interface Props {
  field: any;
  fieldState: ControllerFieldState;
}

const categories: Category[] = [
  { _id: "1", name: "Medicina general" },
  { _id: "2", name: "Apuntes" },
  { _id: "3", name: "Anatomía" },
];

export default function CategoryDropdown({ field, fieldState }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState<Category | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = (e: Category) => {
    setSelectedValue(e);
  };

  return (
    <div>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <CustomInput
          outline={true}
          error={fieldState.error}
          label="Categoría"
          placeholder="Selecciona"
          onChange={() => {}}
          type="text"
          value={selectedValue?.name || ""}
        />
        <Box
          sx={{
            position: "absolute",
            right: 16,
            top: 35,
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon />
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((e: Category) => {
          return (
            <MenuItem
              key={e._id}
              onClick={() => {
                handleClose();
                handleCategoryClick(e);
              }}
            >
              {e.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
