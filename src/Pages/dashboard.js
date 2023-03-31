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


export default function Dashboard() {

    const selected_jd_file = '';
    const selected_resume_file = '';
    /*
        const resumeJdMatchScoreCal = () => {
            const formData = new FormData();
            formData.append('jd_file', selected_jd_file);
            formData.append('resume_file', selected_resume_file);
            fetch(
                'http://127.0.0.1:5000/resumeScreening',
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
    */
    const [render, setRender] = useState(0)
    const [jobdata, setJobData] = useState([
       
    ])
    const [completedjobs, setCompletedJobs] = useState([])
    const [jobpostings, setjJobPostings] = useState("")
    const [totalapplications, setTotalApplications] = useState("")
    const [totalshortlisted, setTotalShortlisted] = useState("")
    const [averagescore, setAverageScore] = useState("")
    const navigate = useNavigate()
    var data = () => { }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/getdashboard')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setJobData(data.pendingjobs);
                setCompletedJobs(data.completedjobs);
                setjJobPostings(data.jobpostings);
                setTotalApplications(data.totalapplications);
                setTotalShortlisted(data.totalshortlisted);
                setAverageScore(data.averagescore);
            });
    }, []);

    if (render == 0) {
        data = () => {

            return (
                <TableContainer component={Paper} id = "1" key={"2"}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell align="right">Job</StyledTableCell>
                                <StyledTableCell align="right">Job Description</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">JD vs Resume Match Score</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobdata.map((row) => (
                                <StyledTableRow key={row.company}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.company}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.title}</StyledTableCell>
                                    <StyledTableCell align="right"><Button color="secondary" variant="outlined">Link</Button></StyledTableCell>
                                    <StyledTableCell align="right">Shortlisted</StyledTableCell>
                                    <StyledTableCell align="right">{row.resume}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    if (render == 1) {
        data = () => {
            return (
                <TableContainer component={Paper} id = "3" key={"4"}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell align="right">Job</StyledTableCell>
                                <StyledTableCell align="right">Proceed To Test</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobdata.map((row) => (
                                <StyledTableRow key={row.company}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.company}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.title}</StyledTableCell>
                                    <StyledTableCell align="right"><Button onClick={() => { localStorage.setItem('jobId', row.id); navigate('/test') }} variant="outlined" color="secondary">Link</Button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    if (render == 2) {
        data = () => {
            return (
                <TableContainer component={Paper} id = "5" key={"6"}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell align="right">Job</StyledTableCell>
                                <StyledTableCell align="right">Test Score</StyledTableCell>
                                <StyledTableCell align="right">Emotional Score</StyledTableCell>
                                <StyledTableCell align="right">Confidence Score</StyledTableCell>
                                <StyledTableCell align="right">Cheat Score</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {completedjobs.map((row) => (
                                <StyledTableRow key={row.company}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.company}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.title}</StyledTableCell>
                                    <StyledTableCell align="right">{row.score}</StyledTableCell>
                                    <StyledTableCell align="right">{row.emotion}</StyledTableCell>
                                    <StyledTableCell align="right">{row.confidence}</StyledTableCell>
                                    <StyledTableCell align="right">{row.cheat}</StyledTableCell>
                                    <StyledTableCell align="right">{row.selected}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }


    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '15vw', height: '91vh', flexDirection: "column", backgroundColor: '#240046' }}>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 0 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { setRender(0) }}>
                        <Home sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Dashboard
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 1 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { setRender(1) }}>
                        <Quiz sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Pending Test
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 2 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { setRender(2) }}>
                        <Cloud sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Check All Applications
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 3 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/') }}>
                        <Logout sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Sign Out
                    </div>
                </div>
                <div style={{ width: '80vw', padding: '3%', backgroundColor: '#EBECF1' }}>
                    <Grid container>
                        <Grid item sm={3} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Job Posting
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {jobpostings}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={3} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Total Applications Sent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {totalapplications}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={3} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Total Short Listed
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {totalshortlisted}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={3} sx={{ margin: "10px 0px", }} >
                            <Card sx={{ maxWidth: "90%", height: "200px", borderRadius: "8px", margin: "0px auto" }}>
                                <CardContent>
                                    <Box sx={{ background: "#240046", borderRadius: "12px", width: "max-content", padding: "15px", color: "white", marginBottom: "10px" }}>
                                        <Settings fontSize="large" />
                                    </Box>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }} gutterBottom>
                                        Average test Score
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {averagescore}
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