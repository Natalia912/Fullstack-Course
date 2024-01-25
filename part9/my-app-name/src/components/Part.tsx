type Props = {
  name: string,
  count: number,
  description?: string,
  group?: number,
  background?: string,
  requirements?: string[]
}

const Part = (props: Props) => {
  return (
    <div>
      <p style={{fontWeight: 600}}>{props.name} {props.count}</p>
      {props.description && <p style={{fontStyle: 'italic'}}>{props.description}</p>}
      {props.group && <p>Group projects: {props.group}</p>}
      {props.background && <p>Background Material: {props.background}</p>}
      {props.requirements && (
        <p>requirements: {props.requirements.join(', ')}</p>
      )}
    </div>
  )
}

export default Part