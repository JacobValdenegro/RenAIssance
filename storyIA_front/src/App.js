import React, { useState } from 'react';
import axios from 'axios';

const RenAIssanceComponent = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://jacobdominio.me:3001/api/ask', { question }); // Cambia la URL según tu configuración de backend
      setResponse(res.data.answer);
    } catch (error) {
      console.error(error);
      // Manejar errores, por ejemplo:
      setResponse('Error occurred while fetching the answer');
    }
  };

  return (
    <div style={{ textAlign: 'center', background: `url(${require('./images/rnc.jpeg')}) center center fixed`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ border: '3px solid #3f51b5', borderRadius: '4px', padding: '22px', maxWidth: '500px', margin: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h2 style={{ color: '#3f51b5', marginBottom: '20px' }}>RenAIssance</h2>
        <p style={{ marginBottom: '10px' }}>Ask something to a deceased renaissance painter </p>
        <textarea
          value={question}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', minHeight: '100px', marginBottom: '10px', borderRadius: '5px', padding: '1px', resize: 'none' }}
        />
        <br />
        <button onClick={handleSubmit} style={{ backgroundColor: '#3f51b5', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Ask</button>
        <br />
        <div style={{ marginTop: '20px' }}>
          {response && <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>{response}</div>}
        </div>
      </div>
    </div>
  );
};

export default RenAIssanceComponent;

