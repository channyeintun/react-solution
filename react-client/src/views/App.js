import { ProductList } from "./ProductList";
import { Main } from './Main';
import ProductForm from "./ProductForm";
import { useRoutes } from 'react-router-dom';

function App() {
      const routes = [
            {
                  path: "/",
                  element: <Main />,
                  children: [
                        {
                              index: true,
                              element: <ProductList />
                        },
                        {
                              path: "register",
                              element: <ProductForm />
                        },
                        {
                              path: "edit/:id",
                              element: <ProductForm />
                        }
                  ]
            },
            {
                  path: "*",
                  element: <h1>404 Not Found</h1>
            }
      ];

      const elements = useRoutes(routes);
      return <>
            {elements}
      </>;
}

export default App;
