import React from 'react'
import { useHistory } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import Table from '../components/Table';

export default function Home() {
    const history = useHistory();

    const redirectToAddToken = () => {
        history.push('/add-token');
}
  return (
    <div>
        <div><img src={Logo} alt="logo" /></div>
        <div>
            <div><h2>Wish Wallet</h2></div>
            <div><button type="button" onClick={ redirectToAddToken }>Add Token</button></div>
        </div>
        <Table />
    </div>
  )
}
