import React,{ useState } from 'react';

function LoginPage() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) =>{
    event.preventDefault(); //페이지리프레쉬 막기
    console.log('Email',Email);
    console.log('Password',Password);

    
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center',alignItems:'center'
    , width: '100%', height: '100vh'
    }}>
      {/* <h2>로그인 페이지</h2> */}
      <div>
        <form style= {{display:'flex', flexDirection:'column'}}
          onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <br/>
            <button>
              Login
            </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
