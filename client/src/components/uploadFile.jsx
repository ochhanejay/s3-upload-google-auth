import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, ImageList, ImageListItem, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import axios from 'axios';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UploadFile = () => {



  const [singleFile, setSingleFile] = useState();

  const history = useNavigate();


  const onUploadMultiple = async () => {
    if (!singleFile) {
      return;
    }

    const formData = new FormData();

    formData.append('files', singleFile);
    try {

      let userId = localStorage.getItem("userId")

      await axios.put(`http://localhost:9000/api/uploadFile?id=${userId}`, formData).then(resp => {
        console.log(resp)
        history("/showFiles");
      });


    } catch (err) {
      console.warn(err);
    }
  };


  return (

    <div style={{ overflow: "hidden" }} >
      <Grid container spacing={3} sx={{ flexGrow: 1, mt: 5 }} >
        <Grid xs={6} md={4} lg={3} mdOffset={0} className="card-shadow">
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mx: 2, my: 2 }}>
              <AccountCircle style={{ color: "red", marginRight: "0.4rem" }} sx={{ color: 'action.active', my: 1 }} />
              <h5 className=''> File  Uploader</h5>
            </Box>
          </Item>

          <Item>
            <Button
              variant="contained"
              component="label"
              color="primary"
              align='start'
              sx={{ justifyContent: "start" }}
            >
              Choose File
              <input
                type="file"
                onChange={(e) => setSingleFile(e.target.files[0])}

                hidden
              />
            </Button>
          </Item>
          <Item>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              onClick={onUploadMultiple}
            >
              Upload File

            </Button>
          </Item>

        </Grid>


        <Grid xs={6} md={6} mdOffset={2}>
          <Item>
            <h4>{singleFile?.name}</h4>
          </Item>
        </Grid>

      </Grid>

    </div>);
}

export default UploadFile;