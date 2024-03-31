import { FC } from "react";
import styles from "./Card.module.scss";
import { Link } from 'react-router-dom'

type QueryParams = {
  imgLink: string;
  title: string;
};

const Card: FC<QueryParams> = ({ imgLink, title }) => {
  return (
    <Link to={title}>
      <article className={styles.container}>
        <h3>{title}</h3>
        <img className={styles.container__sprite} src={imgLink} alt={title} />
      </article>
    </Link>
  );
};

export { Card };
