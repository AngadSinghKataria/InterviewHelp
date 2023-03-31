import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { Cloud, Home, Logout, Quiz, Settings } from "@mui/icons-material";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DashboardAdmin() {

    const [render, setRender] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const navigate = useNavigate()

    function handleFileSelection(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file.name);
    }
    const handleFileSubmission = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch(
            'http://127.0.0.1:5000/uploadfile',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    var data = () => { }
    if (render == 0) {
        data = () => {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Job Title</StyledTableCell>
                                <StyledTableCell align="right">Applications Recieved</StyledTableCell>
                                <StyledTableCell align="right">Job Description</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={1}>
                                <StyledTableCell component="th" scope="row">
                                    Front End Dev
                                </StyledTableCell>
                                <StyledTableCell align="right">80</StyledTableCell>
                                <StyledTableCell align="right"><Button color="secondary" variant="outlined">Link</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={2}>
                                <StyledTableCell component="th" scope="row">
                                    Back End Dev
                                </StyledTableCell>
                                <StyledTableCell align="right">20</StyledTableCell>
                                <StyledTableCell align="right"><Button color="secondary" variant="outlined">Link</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={3}>
                                <StyledTableCell component="th" scope="row">
                                    Full Stack Dev
                                </StyledTableCell>
                                <StyledTableCell align="right">80</StyledTableCell>
                                <StyledTableCell align="right"><Button color="secondary" variant="outlined">Link</Button></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    if (render == 1) {
        data = () => {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Job</StyledTableCell>
                                <StyledTableCell align="right">Preview Test</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={1}>
                                <StyledTableCell component="th" scope="row">
                                    Front End Dev
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => { navigate('/testpreview') }} variant="outlined" color="secondary">Preview</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={2}>
                                <StyledTableCell component="th" scope="row">
                                    Back End Dev
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => { navigate('/testpreview') }} variant="outlined" color="secondary">Preview</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={3}>
                                <StyledTableCell component="th" scope="row">
                                    Full Stack Dev
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => { navigate('/testpreview') }} variant="outlined" color="secondary">Preview</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={4}>
                                <StyledTableCell align="right"><Button onClick={() => { navigate('/createtest') }} variant="outlined" color="secondary">Create</Button></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    if (render == 2) {
        data = () => {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Job</StyledTableCell>
                                <StyledTableCell align="right">See Applications</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={1}>
                                <StyledTableCell component="th" scope="row">
                                    Frontend
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => { setRender(3) }} variant="outlined" color="secondary">Set Render</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={2}>
                                <StyledTableCell component="th" scope="row">
                                    Backend
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => { setRender(3) }} variant="outlined" color="secondary">Set Render</Button></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={3}>
                                <StyledTableCell component="th" scope="row">
                                    Full Stack
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => { setRender(3) }} variant="outlined" color="secondary">Set Render</Button></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    if (render == 3) {
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%' }}>
                    <tr onClick={() => { setRender(2) }}>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Candidate Name</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Job</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Test Score</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Download Resume</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Download Report</th>
                        <th style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>Status</th>
                    </tr>
                    <tr>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Abhinav</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Front End Dev</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>80%</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                        <td style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>Shortlisted</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>hetvii</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Front End Dev</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>80%</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                        <td style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>Not Shortlisted</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Ananya</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Front End Dev</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>80%</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                        <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                        <td style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>Shortlisted</td>
                    </tr>
                </table>
            )
        }
    }



    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '15vw', height: '91vh', flexDirection: "column", backgroundColor: '#240046' }}>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: "white", cursor: "pointer" }}
                        onClick={() => { setRender(0) }}>
                        <Home sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Dashboard
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: "white", cursor: "pointer" }}
                        onClick={() => { setRender(1) }}>
                        <Quiz sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Pending Test
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: "white", cursor: "pointer" }}
                        onClick={() => { setRender(2) }}>
                        <Cloud sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Check All Applications
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: "white", cursor: "pointer" }}
                        onClick={() => { navigate('/') }}>
                        <Logout sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Sign Out
                    </div>
                </div>
                <div style={{ width: '80vw', padding: '3%', backgroundColor: '#EBECF1' }}>
                    <Grid container>
                        <Grid item sm={4} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Job Posting
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        10
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={4} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Total Applications Sent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        3
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={4} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Total Short Listed
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        8
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: "20px" }}>
                        {data()}
                    </Box>
                </div>
            </div>
        </>
    )
}