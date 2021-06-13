import {
  Card,
  
  ContainerColumn,
  ContainerRow,
  MarginAround,

} from '../../styles/styled';

import { Link } from 'react-router-dom';
import { ColorOne, ColorTwo } from '../../styles/color';

function AssetComponents({ catCount, supCount }) {
  return (
    <>
    <ContainerRow height="20%">
          <ContainerColumn className='col-md-3 col-sm-6 col-xs-6'>
            
           
          
                <Card single>
                  <MarginAround>
                     <i class="fa fa-database mr-2" style={{color:ColorOne}} aria-hidden="true"></i>
              <Link to='/post' style={{textDecoration:"none" ,color:ColorTwo}}>
              
           
                New
              </Link>
              </MarginAround>
              
              </Card>
          
           
          </ContainerColumn>
          <ContainerColumn className='col-md-3 col-sm-6 col-xs-6'>
            <Card single>
              <MarginAround>

           
        <i class="fa fa-cubes mr-2" style={{color:ColorOne}} aria-hidden="true"></i>

            

              <span style={{ textDecoration: 'none', color: ColorOne }}>
                Category-{catCount}
              </span>
              </MarginAround>
                </Card>
            
           
          </ContainerColumn>
          <ContainerColumn className='col-md-3 col-sm-6 col-xs-6'>
            <Card single>
              <MarginAround>

           
            <i class="fa fa-users mr-2" style={{color:ColorOne}} aria-hidden="true"></i>
            
           
              

              <span style={{ textDecoration: 'none', color: ColorTwo }}>
                Suppliers{supCount}
              </span>
              </MarginAround>
               </Card>
          
          </ContainerColumn>
          <ContainerColumn className='col-md-3 col-sm-6 col-xs-6'>
            <Card single>
              <MarginAround>

           
            
         <i class="fa fa-tags mr-2" style={{color:ColorOne}} aria-hidden="true"></i>
           
              

              <span style={{ textDecoration: 'none', color: ColorTwo }}>
               products-4
              </span>
              </MarginAround>
               </Card>
          
          </ContainerColumn>
          </ContainerRow>
          </>
      
  );
}
export default AssetComponents;
