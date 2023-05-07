import { Button, Link } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getApiRequest } from '../../api';
import axios from "axios";
import FileDownload from 'js-file-download'


const ShowImages = () => {
    const history = useNavigate();
    const [fileData, setFileData] = React.useState();
    React.useEffect(() => {
        getAllImages();
    }, [0])
    const getAllImages = async () => {
        let id = localStorage.getItem("userId")
        await getApiRequest(`/getFiles?id=${id}`).then(resp => {
            console.log(resp.data);
            setFileData(resp.data);
        });
    }

    const downloadFile = async (key) => {
        const res = await axios.get(`http://localhost:9000/api/downloadFile?key=${key}`, { responseType: 'blob' }).then(resp => {
            FileDownload(resp.data, key)
        });



        // await getApiRequest(`/downloadFile?key=${key}`).then(resp => {
        //     // window.location.href = resp;
        //     console.log(resp)
        //     // setFileData(resp.data);
        //     // history("/cards");
        // });
    }
    return (
        <div className='container'>
            <h2 className='my-5 text-danger text-center'>FILES</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Serial No.</th>
                        <th scope="col">File Name</th>
                        <th scope="col">File Size</th>
                        <th scope="col">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {fileData?.fileArray?.map((files, index) => <tr key={files._id}>
                        <th scope="row">{index + 1}</th>
                        <th>{files.fileName}</th>
                        <th>{files.fileSize}</th>
                        <td><Link ><Button
                            variant="contained"
                            component="label"
                            color="secondary"
                            onClick={() => downloadFile(files.fileKey)}
                            sx={{ mx: 5 }}
                        >
                            Download

                        </Button></Link></td>
                    </tr>)}


                </tbody>
            </table>

        </div>

    )
}

export default ShowImages;