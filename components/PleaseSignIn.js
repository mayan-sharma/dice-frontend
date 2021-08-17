import { useUser } from './User';
import SignIn from './SignIn';

export default function({ children }) {
    
    const currUser = useUser();
    
    if (!currUser) return <SignIn />

    return children;
}