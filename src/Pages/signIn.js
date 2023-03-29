import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const [signUp, setSignUp] = useState(false)
  const [render, setRender] = useState(false)
  const [recruiter, setRecruiter] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  var head = "NMIMS Student"
  var text1 = "New User?"
  var text2 = "Create Account"
  var buttonTextUp = 'Sign In As '
  var buttonTextDown = 'Sign In As '
  var buttonText2 = 'Sign Up Now'


  const navigate = useNavigate()

  function handleFileSelection(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  }
  const handleFileSubmission = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch(
      'http://127.0.0.1:5000/uploadfile',
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


  if (signUp) {
    text1 = "Already have an"
    text2 = "account?"
    buttonTextDown = 'Sign Up As '
    buttonTextUp = 'Sign Up As '
    buttonText2 = 'Sign In Now'
  }

  if (recruiter) {
    head = "NMIMS Recruiters"
    buttonTextDown = buttonTextDown + ' Student'
    buttonTextUp = buttonTextUp + ' Recruiter'
  } else {
    buttonTextUp = buttonTextUp + ' Student'
    buttonTextDown = buttonTextDown + ' Recruiter'
  }


  var data = () => { }

  if (render == 0) {
    data = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '50%', minHeight: '80%', backgroundColor: '#E2E2E2', paddingLeft: '7%', paddingRight: '7%', borderBottomRightRadius: '25px', borderTopRightRadius: '25px' }}>
          <div style={{ fontSize: '56px', fontWeight: '600', lineHeight: '52px', color: '#3F206F', textAlign: 'center' }}>{text1}</div>
          <div style={{ fontSize: '56px', fontWeight: '600', lineHeight: '52px', color: '#3F206F', textAlign: 'center' }}>{text2}</div>
          <div style={{ borderRadius: '25px', width: '220px', padding: '3%', marginTop: '30px', backgroundColor: '#BC9DE0', textAlign: 'center', fontWeight: '500', fontSize: '16px' }} onClick={() => { setSignUp(!signUp) }}>{buttonText2}</div>
        </div>
      )
    }
  }

  if (render == 1) {
    data = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '50%', minHeight: '100%', backgroundColor: '#E2E2E2', borderBottomRightRadius: '25px', borderTopRightRadius: '25px' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', lineHeight: '52px', color: '#3F206F', textAlign: 'center' }}>Experience Related</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter Skills' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter Most Recent Company' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter Most Recent Job Title' />
            <div>
              Upload Resume
              <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="file" onChange={handleFileSelection} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '25px', width: '60%', padding: '3%', marginTop: '30px', backgroundColor: '#BC9DE0', textAlign: 'center', fontWeight: '500', fontSize: '16px' }} onClick={() => { setRender(2) }}>Next</div>
          </div>
        </div>
      )
    }
  }

  if (render == 2) {
    data = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '50%', minHeight: '100%', backgroundColor: '#E2E2E2', borderBottomRightRadius: '25px', borderTopRightRadius: '25px' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', lineHeight: '52px', color: '#3F206F', textAlign: 'center' }}>Educational Background</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter Most Recent Qualification' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter Instiitue Name' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter Marks Obtained In Percentage' />
            <div>
              Upload Marksheet
              <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="file" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '25px', width: '60%', padding: '3%', marginTop: '30px', backgroundColor: '#BC9DE0', textAlign: 'center', fontWeight: '500', fontSize: '16px' }} onClick={() => { setRender(3) }}>Next</div>
          </div>
        </div>
      )
    }
  }

  if (render == 3) {
    data = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '50%', minHeight: '100%', backgroundColor: '#E2E2E2', borderBottomRightRadius: '25px', borderTopRightRadius: '25px' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', lineHeight: '52px', color: '#3F206F', textAlign: 'center' }}>Projects</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Describe Your Best Project' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Give It A Name' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Enter All The Skills Used' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='(Optional) Enter URL Of The Project' />
            <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '25px', width: '60%', padding: '3%', marginTop: '30px', backgroundColor: '#BC9DE0', textAlign: 'center', fontWeight: '500', fontSize: '16px' }} onClick={() => { navigate('/dashboard'); handleFileSubmission()}}>Sign Up Now</div>
          </div>
        </div>
      )
    }
  }


  const navigateMe = () => {
    if (recruiter) {
      navigate('/recruiter')
    } else if (signUp && !recruiter) {
      setRender(1)
      // navigate('/dashboard')
    } else if (!signUp) {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{ background: 'linear-gradient(270deg, #BE9FE2 0%, #E2CAED 100%)', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '80%', height: '80%', paddingTop: '2.5%', paddingLeft: '10%', borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '36%', minHeight: '80%', backgroundColor: 'white', paddingLeft: '7%', paddingRight: '7%', paddingBottom: '7%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', marginTop: '5%' }}>
            <div style={{ fontSize: '35px', fontWeight: '600', lineHeight: '52px', color: '#3F206F', textAlign: 'center' }}>{head}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="text" placeholder='Username' />
            <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="password" placeholder='Password' />
            {signUp &&
              <input style={{ width: '100%', height: '40px', padding: '1%', marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} type="password" placeholder='Confirm Password' />
            }
            <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '25px', width: '60%', padding: '3%', marginTop: '30px', backgroundColor: '#BC9DE0', textAlign: 'center', fontWeight: '500', fontSize: '16px' }} onClick={() => { navigateMe() }}>{buttonTextUp}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: '40px', marginBottom: '10px' }}>OR</div>
            <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '25px', width: '60%', padding: '3%', marginTop: '30px', backgroundColor: '#BC9DE0', textAlign: 'center', fontWeight: '500', fontSize: '16px' }} onClick={() => { setRecruiter(!recruiter); if (!recruiter) { setRender(0) } }}>{buttonTextDown}</div>
          </div>
        </div>
        {data()}
      </div>
    </div>
  );
}

