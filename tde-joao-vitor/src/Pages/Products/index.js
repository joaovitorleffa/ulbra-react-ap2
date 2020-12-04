import React from "react";
import { Link, useRouteMatch, Switch, Route, useParams } from "react-router-dom";

import { Container } from "react-bootstrap";
import Category from '../../assets/components/Category';

function Products() {
  let { path, url } = useRouteMatch();
  const { catId } = useParams();

  return (
    <Container>
      <h1>Products</h1>
      <div>
        <ul>
          <li>
            <Link to={`${url}/1`}>Categoria 1</Link>
          </li>
          <li>
            <Link to={`${url}/2`}>Categoria 2</Link>
          </li>
          <li>
            <Link to={`${url}/3`}>Categoria 3</Link>
          </li>
        </ul>

        <Switch>
          <Route exact={true} path={path}>
            <h3>Selecione uma categoria</h3>
          </Route>
          <Route path={`${path}/:catId`}>
            <Category />
          </Route>
        </Switch>
      </div>
    </Container>
  );
}

export default Products;
