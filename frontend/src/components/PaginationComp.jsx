import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useUserStore } from "../store/userStore";

const PaginationComp = () => {
  const { getAllUsers,  pagination } = useUserStore();

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      getAllUsers({ page: (Number(pagination.page) + 1) });
    } else return;
  };

  const handlePrevPage = () => {
    if (!pagination.page === 1) {
      getAllUsers({ page: Number(pagination.page) - Number(1) });
    } else {
      return;
    }
  };

  return (
    <Stack spacing={2}>
      <Pagination
        color="secondary"
        count={Number(pagination.totalPages)}
        page={Number(pagination.page)}
        variant="outlined"
        shape="rounded"
        onChange={(event, newPage) => {
          getAllUsers({ page: newPage });
        }}
        onPrevious={handlePrevPage}
        onNext={handleNextPage}
      />
    </Stack>
  );
};

export default PaginationComp;
