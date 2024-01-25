import { CoursePart } from "../types"
import { assertNever } from "../utils"
import Part from "./Part"

type Props = {
  parts: CoursePart[]
}

const Content = (props: Props) => {
  return (
    <div>
      {props.parts.map(part => {
        switch (part.kind) {
          case 'basic':
            return <Part name={part.name} count={part.exerciseCount} description={part.description} />
          case 'group':
            return <Part name={part.name} count={part.exerciseCount} group={part.groupProjectCount} />
          case 'background':
            return <Part name={part.name} count={part.exerciseCount} background={part.backgroundMaterial}  description={part.description}/>
          case 'special':
            return <Part name={part.name} count={part.exerciseCount} description={part.description} requirements={part.requirements} />
          default:
            return assertNever(part)
        }
      })}
    </div>
  )
}

export default Content