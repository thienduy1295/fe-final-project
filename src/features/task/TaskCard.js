import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { fDate } from "../../utils/formatTime";
import { deleteTask, updateTaskReview, updateTaskToReview } from "./taskSlice";

import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EventIcon from "@mui/icons-material/Event";
import useAuth from "../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";

function TaskCard({ staff, task }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const dayLeft = Math.ceil(
    moment(task.duedate).diff(moment(task.createdAt), "day", true).toFixed(1)
  );
  return (
    <Card
      sx={{
        padding: "10px",
        mb: "10px",
        boxShadow: "none",
        backgroundColor: `${task.status === "done" ? "#e3e6eb" : ""}`,
        borderRight: `${
          task.status !== "done"
            ? dayLeft > 5
              ? "10px solid #54D62C"
              : dayLeft > 2
              ? "10px solid #F2A120"
              : "10px solid #D32F2F"
            : ""
        }`,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{
            mb: 1.5,
            textDecorationLine: `${
              task.status === "done" ? "line-through" : ""
            }`,
          }}
          color="primary.main"
        >
          {task.name}
        </Typography>

        {task.status === "todo" ? (
          user.roles === "admin" ? (
            <IconButton
              color="error"
              aria-label="delete"
              onClick={() => dispatch(deleteTask(task._id))}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              color="success"
              aria-label="review"
              onClick={() => dispatch(updateTaskToReview(task._id, "review"))}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          )
        ) : task.status === "review" ? (
          user.roles === "admin" ? (
            <IconButton
              color="success"
              aria-label="review"
              onClick={() => dispatch(updateTaskReview(task._id, "done"))}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          ) : (
            <VisibilityIcon color="warning" aria-label="review" />
          )
        ) : (
          ""
        )}
      </Stack>

      <Typography
        sx={{
          mb: 1.5,
          textDecorationLine: `${task.status === "done" ? "line-through" : ""}`,
        }}
        color="text.secondary"
      >
        {task.detail}
      </Typography>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <EventIcon style={{ marginRight: "5px", color: "#5B5C5E" }} />
        <Typography color="text.secondary" variant="body2">
          {fDate(task.duedate)}
        </Typography>
      </Stack>
      <Divider light />
      <Stack direction="row" alignItems="center" pt={1}>
        <Avatar
          alt={staff.name}
          src={staff.avatarUrl}
          style={{ marginRight: 10 }}
        />
        {staff.name}
      </Stack>
    </Card>
  );
}

export default TaskCard;
