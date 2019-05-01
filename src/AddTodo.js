import React, { Component } from 'react';


class AddTodo extends Component {
   
    
    makeTodoTitle(){
        const title = document.querySelector("input").value;
       
    
       
            console.log(title);
            return title;
       
          
        }
        
    
        
    
    render() {
        
        console.log();
        return (
            <div>
                
              
            </div>
        );
    }
}

export default AddTodo;