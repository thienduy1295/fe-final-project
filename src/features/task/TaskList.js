import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { Droppable } from "react-beautiful-dnd";

import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { getTaskOfStaff, updateTaskToReview } from "./taskSlice";

function TaskList() {
  const { tasksOfStaff } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskOfStaff());
  }, [dispatch]);

  const todo = [];
  const review = [];
  const done = [];

  useEffect(() => {
    tasksOfStaff.forEach((task) => {
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
  }, [tasksOfStaff]);

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
    if (source.droppableId === "done" && destination.droppableId === "todo") {
      return;
    }
    if (source.droppableId === "review" && destination.droppableId === "todo") {
      return;
    }
    if (source.droppableId === "review" && destination.droppableId === "done") {
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
        source.droppableId === "todo" &&
        destination.droppableId === "review"
      ) {
        dispatch(updateTaskToReview(itemCopy._id, "review"));
      }

      return prev;
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            p: 3,
            backgroundColor: "primary.lighter",
            boxShadow: "none",
            minHeight: "100vh",
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                  return (
                    <Grid item xs={4} key={key}>
                      <Typography variant="h5" sx={{ p: "10px 0px" }}>
                        {data.title}
                      </Typography>
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
                                          <TaskCard
                                            staff={el.assignee}
                                            task={el}
                                          />
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
          </Container>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TaskList;
