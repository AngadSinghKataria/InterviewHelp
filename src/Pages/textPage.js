import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
// const webgazer =  require('webgazer')

const webgazer = window.webgazer

export default function TestPage(){

    const [render, setRender] = useState(0)
    const [option, setOption] = useState(0)
    const [endTest, setEndTest] = useState(false)
    const navigate = useNavigate()
    var data = () => {}
    var color = '#3F206F'
    var dataText = 'Choose'
    var active = false
    
    if(render == 0){
        data = () => {
            return (
                <>
                    <div style={{height: '15vh', width: '90%', borderRadius: '25px', padding: '5%'}}>
                        <div style={{paddingBottom: '15px', fontSize: '25px'}}>Welcome To The Test Section</div>
                        <div style={{paddingBottom: '15px', fontSize: '15px', fontWeight: '900'}}>You Are Being Recorded.</div>
                        <div style={{paddingBottom: '15px', fontSize: '15px', fontWeight: '900'}}>Please Grant Access To Your Mic And Camera</div>
                    </div>
                </>
            )
        }
    }
    if(render == 1){
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%'}}>
                    <tr>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Question 1</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>What tech stack used in this project?</th>
                    </tr>
                    
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>A:</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>React</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: (option == 1) ? 'green':'#3F206F' , borderRadius:'25px', textAlign: 'center', color: 'white'}} onClick={()=> {setOption(1)}}>{(option==1)?'Selected':'Choose'}</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>B:</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Python</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: (option == 2) ? 'green':'#3F206F' , borderRadius:'25px', textAlign: 'center', color: 'white'}} onClick={()=> {setOption(2)}}>{(option==2)?'Selected':'Choose'}</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>C:</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Java</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: (option == 3) ? 'green':'#3F206F' , borderRadius:'25px', textAlign: 'center', color: 'white'}} onClick={()=> {setOption(3)}}>{(option==3)?'Selected':'Choose'}</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>D:</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>None Of The Above</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: (option == 4) ? 'green':'#3F206F' , borderRadius:'25px', textAlign: 'center', color: 'white'}} onClick={()=> {setOption(4)}}>{(option==4)?'Selected':'Choose'}</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}></td>
                    </tr>
                </table>
            )
        }
    }
    useEffect(() => {
        const onLoadWindow = async function() {
            
            var begin =false
            //start the webgazer tracker
            await webgazer.setRegression('ridge') /* currently must set regression and tracker */
                //.setTracker('clmtrackr')
                .setGazeListener(function(data, clock) {
                    begin = true
                    if(data == null && begin){
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
    
    const navigateMe = () => {
        if(endTest){
            window.location.href = '/dashboard'
        }else{
            setRender(1)
            setEndTest(true)
        }
    }

    var endTestText = 'Start Test'

    if(endTest){
        endTestText = 'End Test'
    }
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexDirection:'row'}}>
                    <div style={{width: '15vw',height: '85vh', flexDirection: "column", backgroundColor: '#BFA0E2'}}>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}}>Dashboard</div>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}} onClick={()=>{setRender(1)}}>Pending Test</div>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}}>Check All Applications</div>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}} onClick={()=>{navigate('/')}}>Sign Out</div>
                </div>
                <div style={{width: '80vw', padding: '3%', backgroundColor: '#EBECF1'}}>
                    <div style={{height: 'max-content', width: '80%', borderRadius: '25px', backgroundColor: 'white', paddingLeft: '5%', paddingTop: '1%',}}>
                        {data()}
                        {render > 0 &&
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginRight: '20px'}}>
                            <div style={{width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px'}}>Next Question</div>
                            <div style={{width: '20%', textAlign: 'center', background: 'purple', color: 'white', fontSize: '20px', marginTop: '10px', padding: '1%', borderRadius: '10px'}}>Previous Question</div>
                        </div>
                        }
                        
                    </div>
                    <div style={{width: '60%', textAlign: 'center', background: 'green', padding: '2%', marginTop: '90px', color: 'white', fontSize: '30px'}} onClick={() => {navigateMe()}}>{endTestText}</div>
                </div>
            </div>
        </>
    )
}