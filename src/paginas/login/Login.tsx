import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link,  useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import "./Login.css";
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';

function Login() {
  let navigate =  useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  const [UserLogin,setUserLogin] = useState<UserLogin>(
    {
      id: 0,
      nome: '',
      usuario:'',
      senha:'',
      foto: '',
      tipo: '',
      token:''
      }
      )
      function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
          ...UserLogin,
          [e.target.name]: e.target.value,
        })
      }

      useEffect(() => { 
        if(token !='' ){
          dispatch(addToken(token))
          navigate('/home')
        }
      }, [token])

      async function onSubmit(e: ChangeEvent<HTMLFormElement>){
          e.preventDefault();
         try{
             await login('/usuarios/logar', UserLogin, setToken)
          
          alert('Usuario logado com sucesso'); 
         } 
         catch(error){
          alert('Dados de usuario inconsistentes. Erro ao logar! ');
         }
        }


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
               <Box paddingX= {20}>
               <form onSubmit={onSubmit}>
                      <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                      <TextField value={UserLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                      <TextField value={UserLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                      <Box marginTop={2} textAlign='center'>
                        
                          <Button type='submit' variant='contained' color='primary'>
                            Logar
                          </Button>
                       
                      </Box>
                </form>
                    <Box display= 'flex' justifyContent= 'center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align="center" >Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastroUsuario'>
                        <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                        
                    </Box>
               </Box>
            </Grid>
            <Grid xs={6} className='imagem1'> 
            </Grid>

            </Grid>
    );
}

export default Login;