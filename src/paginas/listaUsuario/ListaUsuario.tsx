import {  Card,  CardActions,  CardContent,  Collapse,  Grid,  IconButton,  Typography,} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenState } from '../../store/tokens/tokensReducer';
import './ListaUsuario.css';
import User from '../../models/User';
import { busca } from '../../services/Service';
import { TabTitle } from '../../tituloPaginas/GeneralFunctions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

function ListaUsuario() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(-1);

  const handleExpandClick = (i: any) => {
    setExpanded(expanded === i ? -1 : i);
  };

  const [user, setUser] = useState<User[]>([]);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState['tokens']>(
    state => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logade!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        progress: undefined,
      });
      navigate('/login');
    }
  }, [token]);

  async function getUsers() {
    await busca('/usuarios', setUser, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getUsers();
  }, [user.length]);
  TabTitle('Lady Debug - Usuários');

  return (
    <>
      {user.length === 0 && (
        <div className="loader-content">
          <span className="loader"></span>
        </div>
      )}
        <Grid container className='center fundolistausuario'>
          {user.map((user, i) => (
            <Box className="cardusuario papel" m={18}>
              <Card className="papel center" variant="outlined">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    className="fonttextousuarios"
                  >
                    Nome: {user.nome}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="p">
                    <img src={user.foto} width="350px" height="250px" alt='' />
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
     </>
  )
}

export default ListaUsuario;
