import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
// const webgazer =  require('webgazer')


export default function CreateTest() {
    
    const [render, setRender] = useState(0)
    const [option, setOption] = useState(0)
    const [endTest, setEndTest] = useState(false)
    const [qna, setQnA] = useState({
        questions: [],
        answers: []
    });
    const [count, setCount] = useState(0);
    const [maxCount, setMaxCount] = useState(-1);
    const navigate = useNavigate()
    
    const incrementCount = () => {    
        setCount(count+1);
        
        if (count>maxCount) {
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
        if(count > 0){
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

      }

      function deleteQuestion() {
        if(maxCount!=-1) {
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
    
            setMaxCount(maxCount-1);
            setCount(Math.max(0, count-1));
        }
        
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
                        <div style={{ paddingBottom: '15px', fontSize: '25px' }}>Welcome To The Test Creation Section</div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Enter questions and answers in the next section.</div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Answers will be used to evaluate user response.</div>
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
                        <textarea style={{display: 'block', width: '80%', marginLeft: '10px'}} className="questionNote" id="questionZone" value={qna.questions[count]} rows={2} cols={40} onChange={updateQuestions}/>
                    </tr>
                    <tr>
                        <textarea style={{display: 'block', width: '80%', marginLeft: '10px'}} className="textNote" id="textZone" value={qna.answers[count]} rows={10} cols={40} onChange={updateAnswers}/>
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

    var endTestText = 'Create Test'

    if (endTest) {
        endTestText = 'Submit Test'
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
                                <div style={{ width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px' }} onClick={() => { deleteQuestion() }}>Delete Question</div>
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