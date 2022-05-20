import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { Droppable } from "react-beautiful-dnd";
import "../App.css";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { getTasks, updateTaskReview } from "../features/task/taskSlice";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TaskCard from "../features/task/TaskCard";
import TaskForm from "../features/task/TaskForm";
import Popup from "./Popup";
import AddIcon from "@mui/icons-material/Add";

function TaskAdminList() {
  const [openPopup, setOpenPopup] = useState(false);

  const { tasksList } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const todo = [];
  const review = [];
  const done = [];

  const [state, setState] = useState({
    todo: {
      title: "To do",
      items: todo,
    },
    review: {
      title: "In Progress",
      items: review,
    },
    done: {
      title: "Complete",
      items: done,
    },
  });

  useEffect(() => {
    tasksList.forEach((task) => {
      if (task.status === "todo") {
        todo.push(task);
      }
      if (task.status === "review") {
        review.push(task);
      }
      if (task.status === "done") {
        done.push(task);
      }
      setState({
        todo: {
          title: "To do",
          items: todo,
        },
        review: {
          title: "In Progress",
          items: review,
        },
        done: {
          title: "Complete",
          items: done,
        },
      });
    });
  }, [tasksList]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    if (source.droppableId === "done" && destination.droppableId === "review") {
      return;
    }
    if (source.droppableId === "review" && destination.droppableId === "todo") {
      return;
    }
    if (source.droppableId === "done" && destination.droppableId === "todo") {
      return;
    }
    if (source.droppableId === "todo" && destination.droppableId === "review") {
      return;
    }
    if (source.droppableId === "todo" && destination.droppableId === "done") {
      return;
    }

    //Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      if (
        source.droppableId === "review" &&
        destination.droppableId === "done"
      ) {
        dispatch(updateTaskReview(itemCopy._id, "done"));
      }

      return prev;
    });
  };

  return (
    <Container>
      <Card
        sx={{
          backgroundColor: "primary.lighter",
          boxShadow: "none",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={7}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
              return (
                <Grid item xs={4} key={key}>
                  <Typography variant="h5" sx={{ p: "10px 0px" }}>
                    {data.title}
                  </Typography>
                  {data.title === "To do" ? (
                    <Stack>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenPopup(true)}
                        sx={{
                          mb: "20px",
                          boxShadow: "none",
                          backgroundColor: "#FFCB05",
                          "&:hover": {
                            backgroundColor: "#404040",
                            color: "#FFCB05",
                          },
                          color: "primary.main",
                        }}
                      />
                    </Stack>
                  ) : (
                    ""
                  )}

                  <Droppable droppableId={key}>
                    {(provided) => {
                      return (
                        <Card
                          component="div"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={"droppable-col"}
                          sx={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                          }}
                        >
                          {data.items.map((el, index) => {
                            return (
                              <Draggable
                                key={el._id}
                                index={index}
                                draggableId={el._id}
                              >
                                {(provided) => {
                                  // console.log(snapshot);
                                  return (
                                    <Stack
                                      // className={`item ${
                                      //   snapshot.isDragging && "dragging"
                                      // }`}
                                      // className="item"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <TaskCard staff={el.assignee} task={el} />
                                    </Stack>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Card>
                      );
                    }}
                  </Droppable>
                </Grid>
              );
            })}
          </DragDropContext>
        </Grid>
      </Card>

      <Popup title="" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TaskForm />
      </Popup>
    </Container>
  );
}

export default TaskAdminList;
