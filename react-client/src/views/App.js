import { ProductList } from "./ProductList";
import { Main } from './Main';
import { RegistrationForm } from "./RegistrationForm";
import { useRoutes } from 'react-router-dom';
import { EditForm } from "./EditForm";

function App() {
      const routes = [
            {
                  path:"/",
                  element:<Main />,
                  children:[
                        {
                              index:true,
                              element:<ProductList />
                        },
                        {
                              path:"register",
                              element:<RegistrationForm />
                        },
                        {
                              path:"edit/:id",
                              element:<EditForm />
                        }
                  ]
            },
            {
                  path:"*",
                  element:<h1>404 Not Found</h1>
            }
      ];

      const elements = useRoutes(routes);
      return <>
            {elements}
      </>;
}

export default App;
