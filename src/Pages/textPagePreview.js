import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
import { Cloud, Home, Logout, Quiz } from "@mui/icons-material"
import { Box, Button, Container, Typography } from "@mui/material"
// const webgazer =  require('webgazer')

const webgazer = window.webgazer

export default function TestPagePreview() {

    const [render, setRender] = useState(0)
    const [option, setOption] = useState(0)
    const [endTest, setEndTest] = useState(false)
    const [qna, setQnA] = useState({
        questions: ['Tell me about yourself?', 'why are you applying?', 'what position are you applying for?'],
        answers: ['', '', '']
    });
    const [count, setCount] = useState(0);
    const navigate = useNavigate()
    const incrementCount = () => {

        setCount(Math.min(count + 1, qna.questions.length - 1));

    };
    const decrementCount = () => {
        if (count != 0) {
            setCount(count - 1);
        }
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
    }

    var data = () => { }
    var color = '#3F206F'
    var dataText = 'Choose'
    var active = false

    if (render == 0) {
        data = () => {
            return (
                <>
                    <Box>
                        <Typography variant="h4" style={{ paddingBottom: '1px', fontWeight: "bold" }}>Welcome To The Test Section</Typography>
                        <Typography variant="h6">You Are Being Recorded.</Typography>
                        <Typography variant="h6">Please Grant Access To Your Mic And Camera</Typography>
                    </Box>
                </>
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
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{qna.questions[count]}</th>
                    </tr>
                    <tr>
                        <textarea style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} className="textNote" id="textZone" value={qna.answers[count]} rows={10} cols={40} onChange={updateAnswers} />
                    </tr>
                </table>
            )
        }
    }
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ TestId: '1011' })
        };
        fetch('https://reqres.in/api/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {

                }
            });

    }, [""]);

    const navigateMe = () => {
        if (endTest) {
            window.location.href = '/dashboard'
        } else {
            setRender(1)
            setEndTest(true)
        }
    }

    var endTestText = 'Start Test'

    if (endTest) {
        endTestText = 'End Test'
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
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginRight: '20px' }}>
                                <Button variant="outlined" onClick={() => { incrementCount() }}>Next Question</Button>
                                <Button variant="outlined" onClick={() => { decrementCount() }}>Previous Question</Button>
                            </div>
                        }

                    </Container>
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="contained" color="secondary" onClick={() => { navigateMe() }}>{endTestText}</Button>
                    </Box>
                </div>
            </div>
        </>
    )
}