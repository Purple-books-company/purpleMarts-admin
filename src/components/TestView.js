import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai";
import {Card, Container, ContainerColumn, ContainerRow} from "../styles/styled"


function TestView() {
 const[state,setState]=useState([1,2,3,4,5,6,7,8]);
 let initial={
   one:"dd",
   two:"sf",
   three:"sf",
   four:"good",
   five:"six",
   six:"seven",
   seven:"eight",
   nine:"nine"
 }
  return (
    <>
    
  <Container>
<ContainerRow dynamic>
 {state.map((value,index)=> <ContainerColumn className="col-md-4 col-sm-6 col-sx-12">
   <Card>

  
  <p>{value.one}</p>
    <p className='collapse' id={'showdata' + index}>
                      <b>Address:</b>
                      {value.two},
                      <br />
                      {value.four}
                      <br />
                      {value.three},
                      <br />
                      {value.four}.
                    </p>
                    <a
                      href={'#showdata' + index}
                      // className="ml-2"
                      data-toggle='collapse'
                    >
                      <AiFillCaretDown />
                      
                    </a>
                     </Card>
  </ContainerColumn>)}

</ContainerRow>
  </Container>
    </>
  )
}
export default TestView;
