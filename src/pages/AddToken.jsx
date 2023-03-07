import React, { useContext, useState } from 'react'
import TokensProvider from '../context/TokensProvider';
import Logo from '../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import ShootingStar from '../assets/shooting-star.svg';

export default function AddToken() {
  const history = useHistory();
  const { token, setToken } = useContext(TokensProvider);
  const [newToken, setNewToken] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewToken(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if(!newToken.token || !newToken.balance) return alert('Make sure to fill both inputs');
    setToken([...token, newToken]);
  }

  const handleReturn = () => {
    history.push('/');
  }

  return (
    <div>
      <div><img src={Logo} alt="logo" /></div>
      <div>
        <img src={ShootingStar} alt="shooting star" />
        <h2>Wish Wallet</h2>
      </div>
      <div>
        <h3>Add Token</h3>
        <button type="button" onClick={ handleReturn }>Voltar</button>
      </div>
      <form action="submit">
        <label htmlFor="token">Token
          <input
          required
          name="token"
          type="text"
          onChange={ handleChange }
          
          />
        </label>
        <label htmlFor="balance">
          <input
          required
          name="balance"
          type="number"
          onChange={ handleChange }
          />
        </label>
        <button type="button" onClick={ handleSubmit }>Save</button>
      </form>
    </div>
  )
}
