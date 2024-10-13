import {useState} from 'react';
import './App.css';

//importando los modulos de firebase
import appFirebase from './credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(appFirebase);

//importando los componentes
import {Login} from './componentes/Login';
import {Logout} from './componentes/Signup';



function App() {

  const [usuario, setUsuario] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (usarioFirebase) {
      setUsuario(userFirebase);
    } else {
      setUsuario(null);
    }
  })

  return (

    <div>
      {usuario ? <Signup correoUsuario = {usuario.email} />: <Login/>}

      
    </div>
  );
}

export default App;
