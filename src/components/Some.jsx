import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';

export default function Some({event}) {

    const facebook = event.externalLinks.facebook[0].url
    const instagram = event.externalLinks.instagram
    const spotify = event.externalLinks.spotify

    const facebookExists = facebook ? <a href={facebook}  target="_blank"><FontAwesomeIcon icon={faFacebook}/></a> : null
    
    return(
        <ul>
            <li>{facebookExists}</li>
        </ul>
        
        
    )
}