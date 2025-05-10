import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';

export default function Some({event}) {

    // Her henter vi inn url for de ulike sosiale mediene dersom de finnes. Derfor har vi spm tegn bak.
    const facebook = event.externalLinks?.facebook?.[0]?.url;
    const instagram = event.externalLinks?.instagram?.[0]?.url;
    const spotify = event.externalLinks?.spotify?.[0]?.url;

    // her lager vi en forkortet if test på hver av de, de sjekker om de urlene eksisterer, dersom de gjør det rendres ikonet med en link til sosiale medier, hvis ikke returnerer den null, altså ingenting
    const facebookExists = facebook ? <a href={facebook}  target="_blank"><FontAwesomeIcon icon={faFacebook}/></a> : null
    const instagramExists = instagram ? <a href={instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a> : null
    const spotifyExists = spotify ? <a href={spotify} target="_blank"><FontAwesomeIcon icon={faSpotify} /></a> : null
    
    // ved å gjøre dette så slipper vi å få undefined, vi får ut kun de som faktisk eksisterer
    return(
        <ul>
            <li>{facebookExists}</li>
            <li>{instagramExists}</li>
            <li>{spotifyExists}</li>
        </ul>
        
    )
}