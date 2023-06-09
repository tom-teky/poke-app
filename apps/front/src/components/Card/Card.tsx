import { FC } from "react"
import styles from './Card.module.scss'

type QueryParams = {
  link: string
  title: string
}

const Card: FC<QueryParams> = ({link, title}) => {
  return(
      <article className={styles.container}>
        <h3>{title}</h3>
        <img className={styles.container__sprite} src={link} alt={title} />
      </article>
  )
}

export { Card }