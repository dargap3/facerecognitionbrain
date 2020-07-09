import React, {useState} from 'react';

const Register = ({ onRouteChange, loadUser }) => {
  const [registerData, setRegisterData] = useState({});

  const updateInput = event => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        registerData
      )
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          loadUser(user);
          onRouteChange('home');
        }
      })
  }


  return (
  <article className={"br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center"}>
    <main className={"pa4 black-80"}>
      <div className={"measure"}>
        <fieldset 
          id={"sign_up"} 
          className={"ba b--transparent ph0 mh0"}
        >
          <legend className={"f1 fw6 ph0 mh0"}>{'Register'}</legend>
          <div className={"mt3"}>
            <label 
              className={"db fw6 lh-copy f6"} 
              htmlFor={"name"}
            >
              {'Name'}
            </label>
            <input 
              className={"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"} 
              type={"text"} 
              name={"name"}  
              id={"name"}
              onChange={updateInput}
            />
          </div>
          <div className={"mt3"}>
            <label 
              className={"db fw6 lh-copy f6"} 
              htmlFor={"email-address"}
            >
              {'Email'}
            </label>
            <input 
              className={"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"} 
              type={"email"} 
              name={"email"} 
              id={"email-address"}
              onChange={updateInput}
            />
          </div>
          <div className={"mv3"}>
            <label 
              className={"db fw6 lh-copy f6"}
              htmlFor={"password"}
            >
              {'Password'}
            </label>
            <input 
              className={"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"}
              type={"password"} 
              name={"password"}  
              id={"password"}
              onChange={updateInput} 
            />
          </div>
        </fieldset>
        <div className="">
          <input 
            onClick={ onSubmitRegister }
            className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"}
            type={"submit" }
            value={"Register"}
          />
        </div>
      </div>
    </main>
  </article>
);}

export default Register;