import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"
 

export default function Dashboard(){

    const [render, setRender] = useState(0)
    const navigate = useNavigate()
    var data = () => {}
    if(render == 0){
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%'}}>
                    <tr onClick={()=>{setRender(2)}}>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Company  </th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Job</th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Test Score</th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Job description</th>   
                        <th style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}>Status</th>
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Amazon</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Front End Dev</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>80%</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius:'25px', textAlign: 'center', color: 'white'}}>Link</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}>Shortlisted</td>
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Google</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Front End Dev</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>80%</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius:'25px', textAlign: 'center', color: 'white'}}>Link</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}>Not Shortlisted</td>
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Microsoft</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Front End Dev</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>80%</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius:'25px', textAlign: 'center', color: 'white'}}>Link</td>
                        <td style={{border: '1px', textAlign: "center",padding: '8px', fontSize: '15px'}}>Shortlisted</td>
                    </tr>
                </table>
            )
        }
    }

    if(render == 1){
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%'}}>
                    <tr onClick={()=>{setRender(2)}}>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Company  </th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Job</th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px',width: '50%'}}>Proceed To Test</th>   
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Amazon</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Front End Dev</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}} onClick={()=>{navigate('/test')}}><div style={{backgroundColor: '#3F206F', borderRadius:'25px', textAlign: 'center', color: 'white', width: '50%', padding: '5px'}}>Proceed</div></td>
                    </tr>
                </table>
            )
        }
    }

    if(render == 2){
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%'}}>
                    <tr onClick={()=>{setRender(2)}}>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Company  </th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Job</th>
                        <th style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px',width: '50%'}}>Status</th>   
                    </tr>
                    <tr>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Amazon</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}}>Front End Dev</td>
                        <td style={{border: '1px', textAlign: "left",padding: '8px', fontSize: '15px'}} onClick={()=>{navigate('/test')}}>Not Selected</td>
                    </tr>
                </table>
            )
        }
    }

    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexDirection:'row'}}>
                    <div style={{width: '15vw',height: '89vh', flexDirection: "column", backgroundColor: '#BFA0E2'}}>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}} onClick={()=>{setRender(0)}}>Dashboard</div>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}} onClick={()=>{setRender(1)}}>Pending Test</div>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}} onClick={()=>{setRender(2)}}>Check All Applications</div>
                    <div style={{fontSize: '19px', fontWeight: '500', padding: '20px'}} onClick={()=>{navigate('/')}}>Sign Out</div>
                </div>
                <div style={{width: '80vw', padding: '3%', backgroundColor: '#EBECF1'}}>
                    <div style={{height: '15vh', width: '90%', borderRadius: '25px', backgroundColor: '#BFA0E2', padding: '5%'}}>
                        <div style={{paddingBottom: '25px', fontSize: '35px'}}>Welcome To NMIMS Students Job Portal</div>
                        <div style={{paddingBottom: '25px', fontSize: '35px', fontWeight: '900', marginTop: '25px'}}>Hetvii Thakkar</div>
                    </div>
                    <div style={{width: '100%', borderRadius: '25px', display: 'flex', flexDirection: "row", marginTop: '10px', marginBottom: '10px', justifyContent: "space-between"}}>
                        <div style={{backgroundColor: "white", padding: '10px', borderRadius:'15px'}}>
                            <div style={{fontSize: '15px'}}>Job Posting</div>
                            <div style={{fontSize: '15px', fontWeight: '700', marginTop: '20px'}}>18</div>
                        </div>
                        <div style={{backgroundColor: "white", padding: '10px', borderRadius:'15px'}}>
                            <div style={{fontSize: '15px'}}>Total Applications Sent</div>
                            <div style={{fontSize: '15px', fontWeight: '700', marginTop: '20px'}}>180</div>
                        </div>
                        <div style={{backgroundColor: "white", padding: '10px', borderRadius:'15px'}}>
                            <div style={{fontSize: '15px'}}>Total Short Listed</div>
                            <div style={{fontSize: '15px', fontWeight: '700', marginTop: '20px'}}>40</div>
                        </div>
                        <div style={{backgroundColor: "white", padding: '10px', borderRadius:'15px'}}>
                            <div style={{fontSize: '15px'}}>Average test Score</div>
                            <div style={{fontSize: '15px', fontWeight: '700', marginTop: '20px'}}>80%</div>
                        </div>
                        
                    </div>
                    <div style={{height: 'max-content', width: '80%', borderRadius: '25px', backgroundColor: 'white', paddingLeft: '5%', paddingTop: '1%',}}>
                        {data()}
                    </div>
                </div>
            </div>
        </>
    )
}