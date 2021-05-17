import { useContext } from 'react'
import Parkcard from './ParkCard'
import PlayGroundContext from '../context/PlayGroundContext'

function HomePage(){
  let {playgrounds} = useContext(PlayGroundContext)
  // playgrounds.length = 12
  console.log(playgrounds)
  return (
    <>
    <h1>Local Playgrounds</h1>
    {/* <iframe title="unique" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d68480.55860440173!2d-73.99022063994349!3d40.664228619888625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1splaygrounds!5e0!3m2!1sen!2sus!4v1620937566263!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
      <input></input>
      <div class="all_parks">
        {playgrounds.map(park => {
          return (
            <Parkcard Park={park}/>
          )
        })}
      </div>  
    </>
  )
}

export default HomePage