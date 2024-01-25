import { SyntheticEvent, useState, useEffect } from 'react';
import axios from 'axios';
import AddForm from './components/AddForm';
import Entries from './components/Entries';
import { Entry, NewEntry } from './types';
import { saveEntry, getEntries } from './api/entries';

function App() {
  const [diaries, setDiaries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const onSubmit = async (event: SyntheticEvent, data: NewEntry) => {
    event.preventDefault();
    setError('');
    try {
      const res: Entry = await saveEntry(data);
      if (res) {
        setDiaries((prev) => [...prev, res]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        setError('Unknown error');
      }
    }
  };
  return (
    <>
      <AddForm onSubmit={onSubmit} error={error} />
      <Entries diaries={diaries} />
    </>
  );
}

export default App;
