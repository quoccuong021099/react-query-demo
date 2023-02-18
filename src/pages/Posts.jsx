import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getListPosts } from "../services/postsServices";

export default function Posts() {
  const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
    ["posts"], // key
    getListPosts, // hàm fetch api
    {
      retry: 1, // số lần call lại khi bị lỗi
      retryDelay: 1000, // sau chừng này thời gian sẽ retry
    }
  );

  console.log("query", data, isLoading, isSuccess, isError, isFetching);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Something went wrong...</Box>;
  }

  return (
    <Box sx={{ p: 1 }}>
      <List
        sx={{
          width: "100%",
          border: "1px solid #ccc",
          p: 1,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          alignContent: "space-between",
        }}
      >
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              alignItems="flex-start"
              sx={{ bgcolor: "#000", color: "#fff", maxWidth: 360 }}
            >
              <ListItemText
                primary={<b>{item?.title}</b>}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="#ccc"
                  >
                    {item?.body}
                  </Typography>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
