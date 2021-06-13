
import { FcExpired } from "react-icons/fc";
import {Msg,CenterText} from '../styles/styled';
function Error(){
    return(
        <div className='container'>
            <Msg>
                <CenterText>404</CenterText>
                <h1><FcExpired size={100}/>Page not Found</h1>
               
            </Msg>
        </div>
    );
}
export default Error;