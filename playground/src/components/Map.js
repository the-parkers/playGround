import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import { useContext } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'
import {Link} from 'react-router-dom'


const userIcon = new Icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/seo-and-digital-marketing-material-glyphs-5/20/239-512.png',
    iconSize: [40,40],
})

function Maps() {
    const context = useContext(PlayGroundContext)
    const {filteredParks,position} = context
if(position.lat) {
     return ( 
    <MapContainer center={[position.lat, position.lon]} zoom={13} key='mapData'>
        <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <Marker Key='userMarker' position={[position.lat, position.lon]} icon={userIcon} >
                <Popup>
                You are here
                </Popup>
          </Marker>
        {
           filteredParks.parksData.map(park => {
               return <Marker Key={park.id} position={[park.park_latitude, park.park_longitude]} icon={filteredParks.type}>
                <Popup>
                    <div>
                     <Link to={`/parks/${park.id}`}>
                        <h3>{park.park_name}</h3>
                        </Link>
                        <hr/>
                        <p>{park.location ?  park.location : park.park_location}</p>
                        <hr/>
                        <span>
                        {park.subcategory} {`${park.distance.toFixed(1)} KM`} 
                            {park.dogruns_type ? ` DogRunType: ${park.dogruns_type}` : park.track_type ? ` TrackType: ${park.track_type} TrackSize: ${park.size}` : park.court_count ? ` CourtCount: ${park.court_count}`: park.pool_size ? ` PoolSize: ${park.pool_size} PoolType: ${park.pool_type}` : null}
                        </span>
                        <hr/>
                        <a href={park.park_link} target='_Blank' rel="noreferrer">Park Link</a>
                    </div>
                </Popup>
                {/* onClick={() => {
                    setActivePark()
                }} */}
          </Marker>
            })
        }
    </MapContainer>
    )}else { return null
 }
}

export default Maps
