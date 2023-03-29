import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Text from "../Components/text"


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
    const [jobdata, setJobData] = useState([])
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
                <table style={{ borderCollapse: '10px', width: '100%' }}>
                    <tr onClick={() => { setRender(2) }}>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Company  </th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Job</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Job description</th>
                        <th style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>Status</th>
                        <th style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>JD vs Resume Match Score</th>
                    </tr>

                    {jobdata.map((x, index) => {
                        return (
                            <tr>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.company}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.title}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white' }}>Link</td>
                                <td style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>Shortlisted</td>
                                <td style={{ border: '1px', textAlign: "center", padding: '8px', fontSize: '15px' }}>{x.resume}</td>
                            </tr>
                        )
                    })}

                </table>
            )
        }
    }

    if (render == 1) {
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%' }}>
                    <tr onClick={() => { setRender(2) }}>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Company  </th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Job</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px', width: '50%' }}>Proceed To Test</th>
                    </tr>
                    {jobdata.map((x, index) => {
                        return (
                            < tr >
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.company}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.title}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }} onClick={() => { localStorage.setItem('jobId', x.id); navigate('/test') }}><div style={{ backgroundColor: '#3F206F', borderRadius: '25px', textAlign: 'center', color: 'white', width: '50%', padding: '5px' }}>Proceed</div></td>
                            </tr>
                        )
                    })}
                </table>
            )
        }
    }

    if (render == 2) {
        data = () => {
            return (
                <table style={{ borderCollapse: '10px', width: '100%' }}>
                    <tr onClick={() => { setRender(2) }}>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Company  </th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Job</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Test Score</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Emotional Score</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Confidence Score</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Cheat Score</th>
                        <th style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>Status</th>
                    </tr>

                    {completedjobs.map((x, index) => {
                        return (
                            <tr>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.company}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.title}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.score}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.emotion}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.confidence}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.cheat}</td>
                                <td style={{ border: '1px', textAlign: "left", padding: '8px', fontSize: '15px' }}>{x.selected}</td>
                            </tr>)
                    })}
                </table>
            )
        }
    }


    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '15vw', height: '89vh', flexDirection: "column", backgroundColor: '#BFA0E2' }}>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { setRender(0) }}>Dashboard</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { setRender(1) }}>Pending Test</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { setRender(2) }}>Check All Applications</div>
                    <div style={{ fontSize: '19px', fontWeight: '500', padding: '20px' }} onClick={() => { navigate('/') }}>Sign Out</div>
                </div>
                <div style={{ width: '80vw', padding: '3%', backgroundColor: '#EBECF1' }}>
                    <div style={{ height: '15vh', width: '90%', borderRadius: '25px', backgroundColor: '#BFA0E2', padding: '5%' }}>
                        <div style={{ paddingBottom: '25px', fontSize: '35px' }}>Welcome To NMIMS Students Job Portal</div>
                        <div style={{ paddingBottom: '25px', fontSize: '35px', fontWeight: '900', marginTop: '25px' }}>Hetvii Thakkar</div>
                    </div>
                    <div style={{ width: '100%', borderRadius: '25px', display: 'flex', flexDirection: "row", marginTop: '10px', marginBottom: '10px', justifyContent: "space-between" }}>
                        <div style={{ backgroundColor: "white", padding: '10px', borderRadius: '15px' }}>
                            <div style={{ fontSize: '15px' }}>Job Posting</div>
                            <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '20px' }}>{jobpostings}</div>
                        </div>
                        <div style={{ backgroundColor: "white", padding: '10px', borderRadius: '15px' }}>
                            <div style={{ fontSize: '15px' }}>Total Applications Sent</div>
                            <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '20px' }}>{totalapplications}</div>
                        </div>
                        <div style={{ backgroundColor: "white", padding: '10px', borderRadius: '15px' }}>
                            <div style={{ fontSize: '15px' }}>Total Short Listed</div>
                            <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '20px' }}>{totalshortlisted}</div>
                        </div>
                        <div style={{ backgroundColor: "white", padding: '10px', borderRadius: '15px' }}>
                            <div style={{ fontSize: '15px' }}>Average test Score</div>
                            <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '20px' }}>{averagescore}</div>
                        </div>

                    </div>

                    <div style={{ height: 'max-content', width: '80%', borderRadius: '25px', backgroundColor: 'white', paddingLeft: '5%', paddingTop: '1%', }}>
                        {data()}
                    </div>
                </div>
            </div>
        </>
    )
}