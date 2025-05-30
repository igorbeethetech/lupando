import React, { useState } from 'react';
import { useRouter } from 'next/router';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState(Array(6).fill(''));
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('sessionToken');
    const payload = {
      userID: token,
      respostas: responses.map((resposta, index) => ({
        idResposta: index + 1,
        resposta,
      })),
    };

    // Replace with actual API endpoint
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    router.push('/thank-you');
  };

  return (
    <div>
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} style={{ display: step === index + 1 ? 'block' : 'none' }}>
          <h2>Step {index + 1}</h2>
          <input
            type="text"
            value={responses[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button onClick={() => setStep(step - 1)} disabled={step === 1}>
            Previous
          </button>
          <button onClick={() => setStep(step + 1)} disabled={step === 6}>
            Next
          </button>
        </div>
      ))}
      {step === 6 && (
        <button onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default MultiStepForm;