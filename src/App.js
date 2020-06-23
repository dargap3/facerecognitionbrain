import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';

const app = new Clarifai.App({
  apiKey: '1c886131991c4cd78e6eb2305d68e2b9'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignIn, setIsSignIn] = useState(false);

  const calculateFaceLocation = (datos) => {
    const clarifaiFace = datos.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  
  const displayFaceBox = box => {
    setBox({
      ...box,
      box: box });
  }
  

  const onInputChange = (event) => {
    setInput(event.target.value);  
  }

  const onButtonSubmit = () => {
    setImgUrl(input);
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        input)
      .then(response => displayFaceBox(calculateFaceLocation(response))
      .catch(err => console.log(err))
    );
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignIn(false)
    } else if (route === 'home') {
      setIsSignIn(true)
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesOptions} 
      />
      <Navigation isSignIn={isSignIn} onRouteChange={onRouteChange} />
      { route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />      
            <FaceRecognition box={box} imgUrl={imgUrl} />          
          </div>  
        : (
          route === 'signin' 
          ? <SignIn onRouteChange={onRouteChange} />
          : <Register onRouteChange={onRouteChange} />
        )   
      }
    </div>
  );
}

export default App;
        
