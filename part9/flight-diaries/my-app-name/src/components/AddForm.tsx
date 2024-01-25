import { SyntheticEvent, useState } from 'react';
import { NewEntry, Visibility, Weather } from '../types';

interface Props {
  onSubmit: (event: SyntheticEvent, data: NewEntry) => void;
  error: string;
}

const AddForm = ({ onSubmit, error }: Props) => {
  const [newEntry, setNewEntry] = useState<NewEntry>({
    date: '',
    weather: '',
    visibility: '',
  });

  return (
    <form className='flex-col' onSubmit={(e) => onSubmit(e, newEntry)}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        <span>Date </span>
        <input
          type='date'
          value={newEntry.date}
          onChange={(e) => setNewEntry((prev) => ({ ...prev, date: e.target.value }))}
        />
      </label>
      <div>
        <span>Weather </span>
        <label>
          <span>{Weather.Cloudy}</span>
          <input
            type='radio'
            name='weather'
            checked={newEntry.weather === Weather.Cloudy}
            value={Weather.Cloudy}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, weather: e.target.value }))}
          />
        </label>
        <label>
          <span>{Weather.Rainy}</span>
          <input
            type='radio'
            name='weather'
            checked={newEntry.weather === Weather.Rainy}
            value={Weather.Rainy}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, weather: e.target.value }))}
          />
        </label>
        <label>
          <span>{Weather.Stormy}</span>
          <input
            type='radio'
            name='weather'
            checked={newEntry.weather === Weather.Stormy}
            value={Weather.Stormy}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, weather: e.target.value }))}
          />
        </label>
        <label>
          <span>{Weather.Sunny}</span>
          <input
            type='radio'
            name='weather'
            checked={newEntry.weather === Weather.Sunny}
            value={Weather.Sunny}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, weather: e.target.value }))}
          />
        </label>
        <label>
          <span>{Weather.Windy}</span>
          <input
            type='radio'
            name='weather'
            checked={newEntry.weather === Weather.Windy}
            value={Weather.Windy}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, weather: e.target.value }))}
          />
        </label>
      </div>
      <div>
        <span>Visibility </span>
        <label>
          <span>{Visibility.Good}</span>
          <input
            type='radio'
            name='visibility'
            checked={newEntry.visibility === Visibility.Good}
            value={Visibility.Good}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, visibility: e.target.value }))}
          />
        </label>
        <label>
          <span>{Visibility.Great}</span>
          <input
            type='radio'
            name='visibility'
            checked={newEntry.visibility === Visibility.Great}
            value={Visibility.Great}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, visibility: e.target.value }))}
          />
        </label>
        <label>
          <span>{Visibility.Ok}</span>
          <input
            type='radio'
            name='visibility'
            checked={newEntry.visibility === Visibility.Ok}
            value={Visibility.Ok}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, visibility: e.target.value }))}
          />
        </label>
        <label>
          <span>{Visibility.Poor}</span>
          <input
            type='radio'
            name='visibility'
            checked={newEntry.visibility === Visibility.Poor}
            value={Visibility.Poor}
            onChange={(e) => setNewEntry((prev) => ({ ...prev, visibility: e.target.value }))}
          />
        </label>
      </div>
      <label>
        <span>Comment </span>
        <input
          type='text'
          value={newEntry.comment}
          onChange={(e) => setNewEntry((prev) => ({ ...prev, comment: e.target.value }))}
        />
      </label>
      <button type='submit'>Save</button>
    </form>
  );
};

export default AddForm;
