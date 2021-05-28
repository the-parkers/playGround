import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';

function SpecificMap({park,type}) {
    return ( 
        <MapContainer id='specificCard' center={[park.park_latitude, park.park_longitude]} key={park.id} zoom={16}>
            <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              <Marker Key={park.id} position={[park.park_latitude, park.park_longitude]} icon={type}>
                <Popup>
                    <div>
                    
                        <h3>{park.park_name}</h3>
                       
                        <hr/>
                        <p>{park.location ?  park.location : park.park_location}</p>
                        <hr/>
                       
                       
                        <a href={park.park_link} target='_Blank' rel="noreferrer">Park Link</a>
                    </div>
                </Popup>
          </Marker>
        </MapContainer>
        )
}

export default SpecificMap
