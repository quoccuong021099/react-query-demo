# keepPreviousData: true (dùng cho phân trang)

# useInfiniteQuery  (dùng cho loadmore)

# isloading => state change

# isFetching => function change

# Dependent Queries

```js
// Get data user
const { data: user } = useQuery(["user", email], getUserByEmail);

const userId = user?.id;

// get user's project
const { isIdle, data: projects } = useQuery(
  ["projects", userId],
  getProjectsByUser,
  {
    // The query will not execute until the userId exists
    enabled: !!userId,
  }
);
```

# staleTime và cacheTime

- staleTime: Thời gian data trong cache được tính là mới, tức là nếu data query này trong cache được tính là mới thì khi gọi query sẽ không call queryFuntion để lấy dữ liệu cập nhật vào cache nữa. "Còn mới thì gọi api làm gì 😃". Mặc định staleTime là 0, tức là cứ dùng query sẽ gọi đến queryFunction.

- cacheTime (default 5*60*1000 ms tức 5 phút): Thời gian data sẽ bị xóa ra khỏi bộ nhớ đệm. Có thể data đã "cũ" nhưng nó chưa bị xóa ra khỏi bộ nhớ đệm vì bạn set staleTime < cacheTime. Thường thì người ta sẽ set staleTime < cacheTime

- nếu 2 query cùng key, query 1 set stale là 5s, tiếp tục gọi query 2 với state là 2s, thì nếu query 1 chưa chạy hết 5s mà gọi query 2 thì như k gọi vì data còn mới
