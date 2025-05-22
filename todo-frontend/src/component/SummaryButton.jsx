import React from 'react';
import { sendSummary } from '../api';
import { toast } from 'react-toastify';

export default function SummaryButton() {
  const handleClick = async () => {
    try {
      const res = await sendSummary();
      toast.success(res.data);
    } catch {
      toast.error('Failed to send summary');
    }
  };

  return <button onClick={handleClick}>Summarize & Send to Slack</button>;
}
