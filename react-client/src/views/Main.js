import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Main() {
      return (<main style={styles.main}>
            <Header />
            <div style={styles.outlet}>
                  <Outlet />
            </div>
      </main>);
}

const styles = {
      main: {
            width: "100vw",
            heigth: "100vh",
      },
      outlet: {
            width: "100%",
            padding: "40px"
      }
}