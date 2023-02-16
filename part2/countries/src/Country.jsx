const Country = ({name, capital, area, languages, flag}) => {

  const languagesArr = () => {
    const langArr = []
    for (let key in languages) {
      langArr.push(languages[key])
    }
    return langArr
  }
  return ( 
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <ul>
        {languagesArr().map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={flag} alt={`${name} flag`} />
    </div>
  );
}

export default Country;