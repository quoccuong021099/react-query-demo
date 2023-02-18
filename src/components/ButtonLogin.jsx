import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";

export default function ButtonLogin() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("data", data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            placeholder="Enter your username"
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            {...register("username", {
              required: "Please, enter your username",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your password"
            fullWidth
            size="small"
            type="password"
            {...register("password", {
              required: "Please, enter your password",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
