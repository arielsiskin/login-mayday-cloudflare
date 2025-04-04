export const runtime = 'experimental-edge';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faNetworkWired, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Login.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error al obtener la IP:', error);
        setIpAddress('No disponible');
      }
    };

    fetchIp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const [username, userDomain] = usuario.split('@');
    let proxyEndpoint = '-';
    let idtask = '';     
  
    // Validar el dominio del correo
    if (userDomain === 'delivery.com') {
      proxyEndpoint = '/api/proxy/delivery/neoapi/webservice.asmx/ExecuteTask03';
       idtask = '1';
    } else if (userDomain === 'ecd04.com') {
      proxyEndpoint = '/api/proxy/ecd04/neoapi/webservice.asmx/ExecuteTask03';
      idtask = '2';
    } else if (userDomain === 'ecd02.com') {
      proxyEndpoint = '/api/proxy/ecd02/neoapi/webservice.asmx/ExecuteTask03';
      idtask = '76';
    } else if (userDomain === 'broxel.com') {
      proxyEndpoint = '/api/proxy/broxel/neoapi/webservice.asmx/ExecuteTask03';
      idtask = '27';
   } else if (userDomain === 'ceneval.com') {
      proxyEndpoint = '/api/proxy/ceneval/neoapi/webservice.asmx/ExecuteTask03';
      idtask = '2';
    } else {
      MySwal.fire({
        title: <strong>Atención</strong>,
        html: "Dominio no válido",
        footer: "Por favor verificar el campo usuario",
        icon: 'error'
      });
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(proxyEndpoint, {
        idTask: idtask,
        param1: username, 
        param2: clave,
        param3: ipAddress,
        userDomain 
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      //console.log(response);
      const responseData = response.data;
      //console.log(axios);

      // Parseo la respuesta
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseData, "application/xml");
      const jsonString = xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
      const parsedResponse = JSON.parse(jsonString);

      if (parsedResponse[0].Status === "true") {
        MySwal.fire({
          title: <strong>¡Éxito!</strong>,
          html: <p>{parsedResponse[0].Message}</p>,
          icon: 'success',
          timer: 5000,
          didClose: () => {
            window.location.href = parsedResponse[0].Message.split(' ').pop();
          }
        });

      } else {
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <p>{parsedResponse[0].Message}</p>,
          icon: 'error'
        });
      }
    } catch (error) {
      MySwal.fire({
        title: <strong>Error</strong>,
        html: "Error al conectar con el servidor",
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleClaveChange = (e) => {
    const value = e.target.value;
    setClave(value);
   // if (/^\d*$/.test(value)) {
     // setClave(value);
    //}
  };

  return (
    <div className={styles.customBody}>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <img className={styles.logo} src="/images/logo.png" alt="Logo" />
          <h3 className={styles.title}>Portal de Acceso</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <input
                  className={styles.input}
                  type="text"
                  value={usuario}
                  onChange={handleUsuarioChange}
                  placeholder="Usuario"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <FontAwesomeIcon icon={faLock} className={styles.icon} />
                <input
                  className={styles.input}
                  type="password"
                  value={clave}
                  onChange={handleClaveChange}
                  placeholder="Clave"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.inputGroup}>
                <FontAwesomeIcon icon={faNetworkWired} className={styles.icon} />
              </label>
              <input
                className={styles.CustomInput}
                type="text"
                value={ipAddress}
                readOnly
              />
            </div>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
