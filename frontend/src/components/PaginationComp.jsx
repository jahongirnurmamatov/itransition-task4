import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const PaginationComp = () => {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color={"#1E293B"} />
    </Stack>
  )
}

export default PaginationComp

