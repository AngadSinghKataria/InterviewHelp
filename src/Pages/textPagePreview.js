import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
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
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{qna.questions[count]}</th>
                    </tr>
                    <tr>
                        <textarea style={{ display: 'block', width: '80%', marginLeft: '10px' }} className="textNote" id="textZone" value={qna.answers[count]} rows={10} cols={40} onChange={updateAnswers} />
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
                <div style={{ width: '15vw', height: '89vh', flexDirection: "column", backgroundColor: '#BFA0E2' }}>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { navigate('/recruiter') }}>Dashboard</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { navigate('/recruiter') }}>Tests</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { navigate('/recruiter') }}>Applications Recieved</div>
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