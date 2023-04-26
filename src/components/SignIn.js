import React, { useState } from 'react';
import Modal from 'react-modal';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';

Modal.setAppElement('#root');

const SignIn = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', result);
      closeModal();
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
        <button type="button" onClick={closeModal}>Close</button>
      </form>
    </Modal>
  );
};

export default SignIn;
