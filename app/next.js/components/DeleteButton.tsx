import { LoadingButton } from '@mui/lab'
import React, { ReactEventHandler } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import useAPI from '../hooks/useAPI'

interface DeleteButtonProps {
  params: any;
  csrfToken: string;
  deleteCallback(): any;
}

const DeleteButton = ({ params, csrfToken, deleteCallback }: DeleteButtonProps) => {
  const [ data, isLoading, doFetch ] = useAPI(`/user/${ params.id }`, {
    method: 'DELETE',
    csrfToken,
  })

  const onDelete: ReactEventHandler = async e => {
    e.preventDefault()
    await doFetch()
    deleteCallback()
  }

  return (
    <LoadingButton
      variant="outlined"
      size="small"
      startIcon={<DeleteOutlinedIcon />} sx={{ ml: 1 }}
      onClick={ onDelete }
      loading={ isLoading }
    >Delete</LoadingButton>
  )
}

export default DeleteButton
