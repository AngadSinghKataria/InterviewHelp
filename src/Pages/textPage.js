import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
// const webgazer =  require('webgazer')

const webgazer = window.webgazer

export default function TestPage() {
    const { jobid } = useLocation();
    console.log("JOBID: ",jobid)
    const [render, setRender] = useState(0)
    const [endTest, setEndTest] = useState(false)
    const [qna, setQnA] = useState({
        questions: []
    });
    const [count, setCount] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: jobid })
        };
        fetch('http://127.0.0.1:5000/gettest', requestOptions)
            .then(response => response.json())
            .then(data => {
                var q=[]
                for (let i = 0; i < data.length; i++) {
                    q.push({
                        questionId: data[i].id,
                        question: data[i].question,
                        answer: ''
                    });
                }

                setQnA({
                    ...qna,
                    questions:q,
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
                            // alert("No Faces Detected ! Reporting!")
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
        
        setCount(Math.min(count+1,qna.questions.length-1));
        
    };
    const decrementCount = () => {
        if(count != 0){
            setCount(count - 1);
        }
    };

    function updateAnswers(event) {
        const value = event.target.value;
        setQnA({
          ...qna,
          questions: [
            ...qna.questions.slice(0, count),
            Object.assign({}, qna[count], {answer: value} ),
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
                    <div style={{ height: '15vh', width: '90%', borderRadius: '25px', padding: '5%' }}>
                        <div style={{ paddingBottom: '15px', fontSize: '25px' }}>Welcome To The Test Section</div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>You Are Being Recorded.</div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Please Grant Access To Your Mic And Camera</div>
                    </div>
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
                        <textarea style={{display: 'block', width: '80%', marginLeft: '10px'}} className="textNote" id="textZone" value={qna.questions[count].answer} rows={10} cols={40} onChange={updateAnswers}/>
                    </tr>
                </table>
            )
        }
    }
    

        

    const navigateMe = () => {
        if (endTest) {
            fetch('http://127.0.0.1:5000/submittest', {
                method: 'POST',
                body: JSON.stringify({
                    questions: qna.questions,
                    jobId: jobid
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
                <div style={{ width: '15vw', height: '85vh', flexDirection: "column", backgroundColor: '#BFA0E2' }}>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }}>Dashboard</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { setRender(1) }}>Pending Test</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }}>Check All Applications</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { navigate('/') }}>Sign Out</div>
                </div>
                <div style={{ width: '80vw', padding: '3%', backgroundColor: '#EBECF1' }}>
                    <div style={{ height: 'max-content', width: '80%', borderRadius: '25px', backgroundColor: 'white', paddingLeft: '5%', paddingTop: '1%', }}>
                        {data()}
                        {render > 0 &&
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginRight: '20px' }}>
                                <div style={{ width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px' }} onClick={() => { incrementCount() }}>Next Question</div>
                                <div style={{ width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px' }} onClick={() => { decrementCount() }}>Previous Question</div>
                            </div>
                        }
                    </div>
                    <div style={{ width: '60%', textAlign: 'center', background: 'green', padding: '2%', marginTop: '90px', color: 'white', fontSize: '30px' }} onClick={() => { navigateMe() }}>{endTestText}</div>
                </div>
            </div>
        </>
    )
}