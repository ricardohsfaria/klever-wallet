import React, { useContext, useEffect, useState } from 'react'
import TokensProvider from '../context/TokensProvider';
import Logo from '../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import ShootingStar from '../assets/shooting-star.svg';

export default function AddToken() {
  const history = useHistory();
  const { token, setToken } = useContext(TokensProvider);
  const [newToken, setNewToken] = useState([]);
  const [validated, setValidation] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewToken(prevState => ({
      ...prevState,
      [name]: value.toUpperCase(),
    }));
  };

  const validateForm = () => {
    let tokenAlreadyExists = false;
    if(token) tokenAlreadyExists = token.some((element) => element.token === newToken.token);
    if(tokenAlreadyExists) return alert('Token already exists');
    if(!newToken.token || !newToken.balance) return alert('Make sure to fill all fields');
    setValidation(true);
  }

  const handleSubmit = () => {
    validateForm();
    if(validated) {
      setToken(prevTokens => [...prevTokens, newToken]);
      history.push('/');
    }
  }

  useEffect(() => {
    localStorage.setItem("tokens", JSON.stringify([...token, newToken]));
  })

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
          id="token"
          name="token"
          type="text"
          onChange={ handleChange }
          value={newToken.token}
          />
        </label>
        <label htmlFor="balance">
          <input
          required
          id="balance"
          name="balance"
          type="number"
          onChange={ handleChange }
          value={newToken.balance}
          />
        </label>
        <button type="button" onClick={ handleSubmit }>Save</button>
      </form>
    </div>
  )
}
