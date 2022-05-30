import { Link } from "react-router-dom";

export function Header() {
      return (<nav style={styles.nav}>
            <ul style={styles.menu}>
                  <li style={styles.li}>
                        <Link to="/" style={styles.link}>Product List</Link>
                  </li>
                  <li style={styles.li}>
                        <Link to="/register" style={styles.link}>Register Product</Link>
                  </li>
            </ul>
      </nav>);
}

const styles = {
      nav: {
            width: "100vw",
            height: "40px",
            backgroundColor: "#00a6fb",
            padding: "0 40px"
      },
      menu: {
            width: "100%",
            height: "100%",
            display: "flex",
            gap: 20,
            flexDirection: "row",
            alignItems: "center"
      },
      li: {
            listStyleType: "none",
            fontSize: "1.25rem",
      },
      link: {
            color: "white",
            textDecoration: "underline"
      }
}