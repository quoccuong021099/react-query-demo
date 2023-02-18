import { Box } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Posts from "./pages/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
