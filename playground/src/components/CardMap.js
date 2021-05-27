import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';



function CardMap({park,icons,type}) {
console.log(type)
     return ( 
    <MapContainer id='parkCard' center={[park.park_latitude, park.park_longitude]} key={park.id} zoom={12} scrollWheelZoom={false} zoomControl={false}>
        <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    
       
              <Marker Key={park.id} position={[park.park_latitude, park.park_longitude]} icon={type}>
                <Popup maxWidth="200" maxHeight="auto">
                    <div>
                    
                        <h3>{park.park_name}</h3>
                       <hr/>
                        <a href={park.park_link} target='_Blank' rel="noreferrer">Park Link</a>
                        

                    </div>
                </Popup>
                
          </Marker>
    </MapContainer>
    )
} 


export default CardMap
