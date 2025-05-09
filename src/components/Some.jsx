import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Some({event}) {

    const facebook = event.externalLinks.facebook
    const instagram = event.externalLinks.instagram
    const spotify = event.externalLinks.spotify
    
    return(
        {
            if (facebook)
                {
                    <ul><li>
                        <a href={facebook}><FontAwesomeIcon icon={faFacebook} /></a>
                </li></ul>
            }   
        }
        
    )
}