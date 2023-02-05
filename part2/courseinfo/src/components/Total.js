function Total({parts}) {

  const total = parts.reduce((pv, cv) => pv + cv.exercises, 0)
  return ( 
    <>
      <p style={{fontWeight: "bold"}}>
        total of {total} exercises
      </p>
    </>
  );
}

export default Total;