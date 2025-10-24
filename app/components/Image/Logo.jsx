
import LogoImage from '@assets/logo.png';

export default function Logo(props) {
    return (
        <img
            src={LogoImage}
            alt="Logo"
            {...props}
        />
    );
}