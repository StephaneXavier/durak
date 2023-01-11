import { Link } from "react-router-dom"

const Home = () => {

    return (
        <>
        <h1>Welcome to Durak</h1>
        <Link to={'/game/' + Math.floor(Math.random()*10000)}>New Game </Link>
        </>
      
    )
}


export default Home