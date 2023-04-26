import { Link } from "react-router-dom"

const Home = () => {

    return (
        <>
        <h1>Welcome to Durak</h1>
        <Link to={'/game/' + Math.random().toString(36).substring(2)}>New Game </Link>
        </>
      
    )
}


export default Home