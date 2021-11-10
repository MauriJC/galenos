import React from 'react'
import swal from 'sweetalert';

const Prueba = () => {
    
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    
    buttons: true,
   
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
 
  return (
    <div>
      
    </div>
  )
}

export default Prueba
