import { Box, Button, Pagination } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { deletePostItem, getListPosts } from "../services/postsServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Posts() {
  const [curPage, setCurPage] = React.useState(1);
  const [isChangePage, setIsChangePage] = React.useState(false);
  const queryClient = useQueryClient();

  const postQuery = useQuery(
    ["posts", curPage], // key
    ({ queryKey }) => getListPosts(queryKey), // hàm fetch api, queryKey = [key, {page, limit}]
    // getListPosts, // cách viết khác cũng có querykey như trên
    {
      cacheTime: 1000, // //Thời gian cache data, ví dụ: 2000, sau 2s thì cache sẽ bị xóa, khi đó data trong cache sẽ là undefined
      refetchOnWindowFocus: false, // không refetch khi change tab
      retry: 1, // số lần call lại khi bị lỗi
      retryDelay: 1000, // sau chừng này thời gian sẽ retry
      staleTime: 1000, // Thời gian data được cho là đã cũ
      keepPreviousData: true, // dùng cho phân trang
    }
  );
  const { data, isLoading, isError, isFetching, refetch, isSuccess } =
    postQuery;

  const deletePost = useMutation({
    mutationFn: deletePostItem,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handlePagination = (_e, nextPage) => {
    setIsChangePage(true);
    setCurPage(nextPage);
  };

  useEffect(() => {
    if (isChangePage) {
      setIsChangePage(false);
    }
  }, [isChangePage]);

  // isloading => state change
  // isFetching => function change

  if (isLoading || isChangePage) {
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
      {/* lấy dữ liệu mới từ api nhưng không có isLoading = false */}
      <button onClick={() => refetch()}>Fetch Todos</button>
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
        {isSuccess &&
          !isLoading &&
          !isFetching &&
          data?.data?.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                alignItems="flex-start"
                sx={{ bgcolor: "#000", color: "#fff", maxWidth: 360 }}
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
                <Button
                  onClick={() => deletePost.mutate(item?.id)}
                  disabled={deletePost.isLoading}
                >
                  Xóa
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
      </List>
      <Pagination
        count={Math.ceil(
          data?.pagination?._totalRows / data?.pagination?._limit
        )}
        color="primary"
        variant="outlined"
        onChange={handlePagination}
        page={curPage}
      />
    </Box>
  );
}
