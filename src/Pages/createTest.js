import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
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

    function handleFileSelection(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file.name);
      }
      const handleFileSubmission = () => {
        const formData = new FormData();
        formData.append('jobdetails', JSON.stringify(job));
        formData.append('file', selectedFile);
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
          })
          .catch((error) => {
            console.error('Error:', error);
          });
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
                    <div style={{ height: '15vh', width: '90%', borderRadius: '25px', padding: '5%', paddingBottom: '40%'}}>
                        <div style={{ paddingBottom: '1px', fontSize: '25px' }}>Welcome To The Test Creation Section</div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Enter Job Title: 
                            <input style={{width: '100%', height: '40px',padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}} type="text" placeholder='Job Title' onChange={updateJobTitle} value={job.jobtitle}/>
                        </div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Enter Company Name: 
                            <input style={{width: '100%', height: '40px',padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}} type="text" placeholder='Company' onChange={updateCompany} value={job.company}/>
                        </div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Enter Location: 
                            <input style={{width: '100%', height: '40px',padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}} type="text" placeholder='Location' onChange={updateLocation} value={job.location}/>
                        </div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Enter Salary: 
                            <input style={{width: '100%', height: '40px',padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}} type="text" placeholder='Salary' onChange={updateSalary} value={job.salary}/>
                        </div>
                        <div style={{ paddingBottom: '15px', fontSize: '15px', fontWeight: '900' }}>Enter Job Description: 
                            <input style={{width: '100%', height: '40px',padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}} type="file" placeholder='Job Description' onChange={handleFileSelection} value={job.jobdescription}/>
                        </div>
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
                    <div style={{ height: 'max-content', width: '80%', borderRadius: '25px', backgroundColor: 'white', paddingLeft: '5%', paddingTop: '1%', height: '80vh' }}>
                        {data()}
                        {render > 0 &&
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginRight: '20px' }}>
                                <div style={{ width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px' }} onClick={() => { incrementCount() }}>Next Question</div>
                                <div style={{ width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px' }} onClick={() => { deleteQuestion() }}>Delete Question</div>
                                <div style={{ width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px' }} onClick={() => { decrementCount() }}>Previous Question</div>
                            </div>
                        }
                        <div style={{ width: '60%', textAlign: 'center', background: 'green', padding: '2%', marginTop: '20px', color: 'white', fontSize: '30px' }} onClick={() => { navigateMe(); handleFileSubmission()}}>{endTestText}</div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}