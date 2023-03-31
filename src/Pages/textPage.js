import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
import { Cloud, Home, Logout, Quiz } from "@mui/icons-material"
import { Box, Button, Container, Typography } from "@mui/material"
// const webgazer =  require('webgazer')

const webgazer = window.webgazer

export default function TestPage({ route, navigation }) {
    const jobId = localStorage.getItem('jobId');
    const [render, setRender] = useState(0)
    const [endTest, setEndTest] = useState(false)
    const [qna, setQnA] = useState({
        questions: []
    });
    const [count, setCount] = useState(0);
    const [cheat, setCheat] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: jobId })
        };
        fetch('http://127.0.0.1:5000/gettest', requestOptions)
            .then(response => response.json())
            .then(data => {
                var q = []
                for (let i = 0; i < data.length; i++) {
                    q.push({
                        questionId: data[i].id,
                        question: data[i].question,
                        answer: ''
                    });
                }

                setQnA({
                    ...qna,
                    questions: q,
                })
            });
        const onLoadWindow = async function () {

            var begin = false
            //start the webgazer tracker
            await webgazer.setRegression('ridge') /* currently must set regression and tracker */
                //.setTracker('clmtrackr')
                .setGazeListener(function (data, clock) {
                    begin = true
                    if (data == null && begin) {
                        //alert("No Faces Detected ! Reporting!")
                        setCheat(cheat + 1)
                    }
                })
                .saveDataAcrossSessions(true)
                .begin();
            webgazer.showVideoPreview(true) /* shows all video previews */
                .showPredictionPoints(false) /* shows a square every 100 milliseconds where current prediction is */
                .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

            //Set up the webgazer video feedback.
            // var setup = function() {

            //     //Set up the main canvas. The main canvas is used to calibrate the webgazer.
            //     var canvas = document.getElementById("plotting_canvas");
            //     canvas.width = window.innerWidth;
            //     canvas.height = window.innerHeight;
            //     canvas.style.position = 'fixed';
            // };
            // setup();
            // webgazer.setGazeListener(function(data, foo) {
            //     if (data == null  && webgazer.isReady()) {
            //         alert(data);
            //     }
            // }).begin();        
            console.log("executed only once!");

        };
        onLoadWindow()
    }, [""]);

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
            questions: [
                ...qna.questions.slice(0, count),
                Object.assign({}, qna.questions[count], { answer: value }),
                ...qna.questions.slice(count + 1)
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
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{qna.questions[count].question}</th>
                    </tr>
                    <tr>
                        <textarea style={{ width: '100%', border: "0.5px solid gray", padding: '1%', marginBottom: '10px', borderRadius: "8px" }} className="textNote" id="textZone" value={qna.questions[count].answer} rows={10} cols={40} onChange={updateAnswers} />
                    </tr>
                </table>
            )
        }
    }




    const navigateMe = () => {
        if (endTest) {
            webgazer.end();
            fetch('http://127.0.0.1:5000/submittest', {
                method: 'POST',
                body: JSON.stringify({
                    questions: qna.questions,
                    jobId: jobId,
                    cheat: cheat
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.log(err.message);
                });
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
                        onClick={() => { navigate('/dashboard') }}>
                        <Home sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Dashboard
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 1 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/dashboard') }}>
                        <Quiz sx={{ position: "relative", top: "5px", marginRight: "10px" }} />
                        Pending Test
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500', padding: '20px', color: render == 2 ? "gold" : "white", cursor: "pointer" }}
                        onClick={() => { navigate('/dashboard') }}>
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
                    <Container sx={{marginTop:"150px"}}>
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