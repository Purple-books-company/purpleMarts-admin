import { ColorOne, ColorTwo } from '../styles/color';
import { FcDeleteDatabase } from "react-icons/fc";
import {Msg} from '../styles/styled';
function Nodata(){
    return(
        <div className='container'>
            <Msg>
            <h1> <FcDeleteDatabase size={100}/>Data not found</h1>
            </Msg>
        </div>
    );
}
export default Nodata;