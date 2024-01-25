import { Entry } from '../types';

interface Props {
  diaries: Entry[];
}

const Entries = ({ diaries }: Props) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map((item) => (
        <div key={item.id} className='entry'>
          <p className='bold'>{item.date}</p>
          <p>Visibility: {item.visibility}</p>
          <p>Weather: {item.weather}</p>
        </div>
      ))}
    </>
  );
};

export default Entries;
