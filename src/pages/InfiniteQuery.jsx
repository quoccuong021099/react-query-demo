import { Autocomplete, Box, Button, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import {
  addPostItem,
  getListPostsInfinite,
  updatePostItem,
} from "../services/postsServices";

const options = [
  { id: 0, age: "All" },
  { id: 1, age: "22" },
  { id: 2, age: "21" },
];

export default function InfiniteQuery() {
  const [age, setAge] = React.useState(options[0]);
  const queryClient = useQueryClient();

  const query = useInfiniteQuery(
    ["posts-infi", age?.age], // key
    ({ pageParam }) => getListPostsInfinite(pageParam, age?.age), // cách viết khác cũng có querykey như trên
    {
      getNextPageParam: (params) => {
        const { _page, _totalRows, _limit } = params?.pagination || {};
        return _page < _totalRows / _limit ? _page + 1 : undefined;
      },
      refetchOnWindowFocus: false, // không refetch khi change tab
    }
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = query;

  const addPost = useMutation({
    mutationFn: addPostItem,
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePost = useMutation({
    mutationFn: updatePostItem,
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) {
    return (
      <Box h={30} textAlign="center">
        <Typography variant="h1">Loading...</Typography>
      </Box>
    );
  }

  if (isError) {
    return <Box>Something went wrong...</Box>;
  }

  return (
    <Box sx={{ p: 1 }}>
      <br />
      <Button onClick={() => addPost.mutate()}>Add item</Button>
      <br />

      <Autocomplete
        options={options}
        value={age}
        onChange={(e, value) => {
          if (value) setAge(value);
        }}
        getOptionLabel={(option) => option?.age?.toString()}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="age" size="small" />
        )}
      />
      <br />
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
        {data?.pages?.map((group, index) => (
          <React.Fragment key={index}>
            {group?.data?.map((item) => (
              <ListItem
                alignItems="flex-start"
                sx={{ bgcolor: "#000", color: "#fff", maxWidth: 360 }}
                key={item.id}
              >
                <ListItemText
                  primary={<b>{item?.name}</b>}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="#ccc"
                    >
                      {item?.gender} - {item?.age}{" "}
                      {item?.city && `- ${item?.city}`}
                    </Typography>
                  }
                />
                <Button onClick={() => updatePost.mutate(item?.id)}>
                  update item
                </Button>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Loadmore
        </button>
      )}
    </Box>
  );
}
