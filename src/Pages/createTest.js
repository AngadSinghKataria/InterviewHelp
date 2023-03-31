import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
import { Cloud, Home, Logout, Quiz } from "@mui/icons-material"
import { Box, Button, Container, Divider, Typography } from "@mui/material"
// const webgazer =  require('webgazer')


export default function CreateTest() {

    const [render, setRender] = useState(0)
    const [option, setOption] = useState(0)
    const [endTest, setEndTest] = useState(false)
    const [job, setJob] = useState({
        jobtitle: "",
        company: "",
        location: "",
        salary: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');


    const [qna, setQnA] = useState({
        questions: [],
        answers: []
    });
    const [count, setCount] = useState(0);
    const [maxCount, setMaxCount] = useState(-1);
    const navigate = useNavigate()



    const incrementCount = () => {
        setCount(count + 1);

        if (count > maxCount) {
            setQnA({
                ...qna,
                questions: [...qna.questions, ''],
                answers: [...qna.answers, '']
            })
            console.log(qna)
            setMaxCount(count);
        }
        console.log(count, maxCount)

    };
    const decrementCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    function handleFileSelection(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file.name);
    }
    const handleFileSubmission = () => {

    };

    function updateAnswers(event) {
        const value = event.target.value;
        setQnA({
            ...qna,
            answers: [
                ...qna.answers.slice(0, count),
                value,
                ...qna.answers.slice(count + 1)
            ]
        });
        console.log(setQnA);
    }

    function updateQuestions(event) {
        const value = event.target.value;
        setQnA({
            ...qna,
            questions: [
                ...qna.questions.slice(0, count),
                value,
                ...qna.questions.slice(count + 1)
            ]
        });
        console.log(setQnA);
    }

    function updateJobTitle(event) {
        const value = event.target.value;
        setJob({
            ...job,
            jobtitle: value
        });
    }

    function updateCompany(event) {
        const value = event.target.value;
        setJob({
            ...job,
            company: value
        });
    }

    function updateLocation(event) {
        const value = event.target.value;
        setJob({
            ...job,
            location: value
        });
    }

    function updateSalary(event) {
        const value = event.target.value;
        setJob({
            ...job,
            salary: value
        });
    }

    function updateJobDescription(event) {
        const value = event.target.value;
        setJob({
            ...job,
            jobdescription: value
        });
    }


    function deleteQuestion() {
        if (maxCount != -1) {
            setQnA({
                ...qna,
                questions: [
                    ...qna.questions.slice(0, count),
                    ...qna.questions.slice(count + 1)
                ],
                answers: [
                    ...qna.answers.slice(0, count),
                    ...qna.answers.slice(count + 1)
                ]
            });

            setMaxCount(maxCount - 1);
            setCount(Math.max(0, count - 1));
        }

    }

    var data = () => { }
    var color = '#3F206F'
    var dataText = 'Choose'
    var active = false

    if (render == 0) {
        data = () => {
            return (
                <Box>
                    <Typography variant="h4" style={{ paddingBottom: '1px', fontWeight: "bold" }}>
                        Welcome To The Test Creation Section
                    </Typography>
                    <Divider sx={{ margin: "20px 0px" }} />
                    <div style={{ paddingBottom: '15px', }}>
                        <Typography sx={{ marginLeft: "10px" }}>
                            Enter Job Title:
                        </Typography>
                        <input style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} type="text" placeholder='Job Title' onChange={updateJobTitle} value={job.jobtitle} />
                    </div>
                    <div style={{ paddingBottom: '15px', }}>
                        <Typography sx={{ marginLeft: "10px" }}>
                            Enter Company Name:
                        </Typography>
                        <input style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} type="text" placeholder='Company Name' onChange={updateCompany} value={job.company} />
                    </div>
                    <div style={{ paddingBottom: '15px', }}>
                        <Typography sx={{ marginLeft: "10px" }}>
                            Enter Location:
                        </Typography>
                        <input style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} type="text" placeholder='Job Location' onChange={updateLocation} value={job.location} />
                    </div>
                    <div style={{ paddingBottom: '15px', }}>
                        <Typography sx={{ marginLeft: "10px" }}>
                            Enter Salary:
                        </Typography>
                        <input style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} type="text" placeholder='Job Salary' onChange={updateSalary} value={job.salary} />
                    </div>
                    <div style={{ paddingBottom: '15px', }}>
                        <Typography sx={{ marginLeft: "10px" }}>
                            Enter Job Description:
                        </Typography>
                        <input style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} type="file" placeholder='Job Description' onChange={handleFileSelection} value={job.jobdescription} />
                    </div>
                </Box >
            )
        }
    }
    if (render == 1) {
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%' }}>
                    <tr>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Question {count}</th>
                    </tr>
                    <tr>
                        <textarea style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} className="questionNote" id="questionZone" value={qna.questions[count]} rows={2} cols={40} onChange={updateQuestions} />
                    </tr>
                    <tr>
                        <textarea style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} className="textNote" id="textZone" value={qna.answers[count]} rows={10} cols={40} onChange={updateAnswers} />
                    </tr>
                </table>
            )
        }
    }



    const navigateMe = () => {
        if (endTest) {

            const formData = new FormData();
            formData.append('jobdetails', JSON.stringify(job));
            formData.append('file', selectedFile);
            formData.append('questions', JSON.stringify(qna));
            fetch(
                'http://127.0.0.1:5000/upload_jd',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    window.location.href = '/recruiter'
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        } else {
            setRender(1)
            setEndTest(true)
        }
    }

    var endTestText = 'Create Test'

    if (endTest) {
        endTestText = 'Submit Test'
    }
    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '15vw', height: '91vh', flexDirection: "column", backgroundColor: '#240046' }}>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 0 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/recruiter') }}>
                        <Home sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Dashboard
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 1 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/recruiter') }}>
                        <Quiz sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Pending Test
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 2 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/recruiter') }}>
                        <Cloud sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Applications Recieved
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 3 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/') }}>
                        <Logout sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Sign Out
                    </div>
                </div>
                <div style={{ width: '80vw', padding: '3%', backgroundColor: '#EBECF1' }}>
                    <Container>
                        {data()}
                        {render > 0 &&
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginRight: '20px', marginBottom: "20px" }}>
                                <Button variant="outlined" onClick={() => { incrementCount() }}>Next Question</Button>
                                <Button variant="outlined" onClick={() => { deleteQuestion() }}>Delete Question</Button>
                                <Button variant="outlined" onClick={() => { decrementCount() }}>Previous Question</Button>
                            </div>
                        }
                        <Box sx={{ textAlign: "center" }}>
                            <Button variant="contained" onClick={() => { navigateMe(); handleFileSubmission() }}>{endTestText}</Button>
                        </Box>
                    </Container>

                </div>
            </div>
        </>
    )
}