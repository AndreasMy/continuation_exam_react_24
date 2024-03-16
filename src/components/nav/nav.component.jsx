import { Link } from 'react-router-dom';

export const Nav = ({
  data,
  ulClassName = '',
  itemClassName = '',
  liClassName = '',
}) => {
  return (
    <nav>
      <ul className={ulClassName}>
        {data.map((item, index) => (
          <li key={index} className={liClassName}>
            <Link to={item.path} className={itemClassName}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};