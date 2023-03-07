import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import ShootingStar from '../assets/shooting-star.svg';
import TokensProvider from '../context/TokensProvider';

export default function EditToken() {
  const history = useHistory();
  const { token, setToken, selectedIndex } = useContext(TokensProvider);
  const [editedToken, setEditedToken] = useState({});
  const [validated, setValidation] = useState(false);
  const [updated, setUpdate] = useState(false);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < token.length) {
      setEditedToken({ ...token[selectedIndex] });
    }
  }, [selectedIndex, token]);

  const handleReturn = () => {
    history.push('/');
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setEditedToken((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tokenAlreadyExists = false;
    if(token) tokenAlreadyExists = token.some((element) => element.token === editedToken.token);
    if(tokenAlreadyExists) return alert('Token already exists');
    if(!editedToken.token || !editedToken.balance) return alert('Make sure to fill all fields');
    setValidation(true);
  }

  const handleSubmit = () => {
    validateForm();
    if(validated) {
      const newTokens = [...token];
      newTokens[selectedIndex] = editedToken;
      setToken(newTokens);
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      history.push('/');
    }
  };

  useEffect(() => {
    if(token) localStorage.setItem("tokens", JSON.stringify(token));
    if(updated) history.push('/');
  })

  const handleDeletion = () => {
    const updatedTokens = token.filter((element) => element !== token[selectedIndex]);
    if(window.confirm("Are you sure you want to delete this token?")) {
      setToken(updatedTokens);
      setUpdate(true);
    }
  }

  return (
    <div>
      <div><img src={Logo} alt="logo" /></div>
      <div>
        <img src={ShootingStar} alt="shooting star" />
        <h2>Wish Wallet</h2>
      </div>
      <div>
        <h3>Edit Token</h3>
        <button type="button" onClick={handleReturn}>Voltar</button>
      </div>
      <form>
        <label htmlFor="token">
          <input
            required
            name="token"
            type="text"
            value={editedToken.token || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="balance">
          <input
            required
            name="balance"
            type="number"
            value={editedToken.balance || ''}
            onChange={handleChange}
          />
        </label>
        <div>
        <button type="button" onClick={handleDeletion}>Remove</button>
        <button type="button" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  )
}
