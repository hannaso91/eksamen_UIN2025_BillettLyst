import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';

export default function Some({event}) {

    const facebook = event.externalLinks?.facebook?.[0]?.url;
    const instagram = event.externalLinks?.instagram?.[0]?.url;
    const spotify = event.externalLinks?.spotify?.[0]?.url;


    const facebookExists = facebook ? <a href={facebook}  target="_blank"><FontAwesomeIcon icon={faFacebook}/></a> : null
    const instagramExists = instagram ? <a href={instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a> : null
    const spotifyExists = spotify ? <a href={spotify} target="_blank"><FontAwesomeIcon icon={faSpotify} /></a> : null
    
    return(
        <ul>
            <li>{facebookExists}</li>
            <li>{instagramExists}</li>
            <li>{spotifyExists}</li>
        </ul>
        
    )
}