import Item1 from '../../Images/Image1.jpg'
import Item2 from '../../Images/Image2.jpg'
import Item3 from '../../Images/Image3.jpg'
import Item4 from '../../Images/Image4.jpg'
import Item5 from '../../Images/Image5.jpg'
import Item6 from '../../Images/Image6.jpg'
import {REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, ADD_FROM_LIST_TO_CART, ADD_TO_SFL, REMOVE_FROM_SFL } from '../actions/action-types/cart-actions';


let initState= {
    items: [
        {id:7,title:'DreamCatcher: A Novel', author:"Steven King", description: "Once upon a time, in the haunted city of Derry (site of the classics It and Insomnia), four boys stood together and did a brave thing. Certainly a good thing, perhaps even a great thing. Something that changed them in ways they could never begin to understand.", price:3.75,cover:Item1, quantity: 0},
        {id:30,title:'The Grapes of Wrath',author:"John Steinbeck", description: "First published in 1939, SteinbeckÔÇÖs Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the JoadsÔÇödriven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity.", price:10.00,cover: Item2, quantity: 0},
        {id:29,title:'Song of Solomon',author:"Toni Morrison", description: "Milkman Dead was born shortly after a neighborhood eccentric hurled himself off a rooftop in a vain attempt at flight. For the rest of his life he, too, will be trying to fly. With this brilliantly imagined novel, Toni Morrison transfigures the coming-of-age story as audaciously as Saul Bellow or Gabriel Garc├¡a M├írquez. As she follows Milkman from his rustbelt city to the place of his familyÔÇÖs origins, Morrison introduces an entire cast of strivers and seeresses, liars and assassins, the inhabitants of a fully realized black world.",price:3.99,cover: Item3, quantity: 0},
        {id:24,title:'Harry Potter and the Goblet of Fire',author:"J.K. Rowling", description: "Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup. He wants to find out about the mysterious event that's supposed to take place at Hogwarts this year, an event involving two other rival schools of magic, and a competition that hasn't happened for a hundred years. He wants to be a normal, fourteen-year-old wizard. But unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in his case, different can be deadly.", price:6.55,cover:Item4, quantity: 0},
        {id:33,title:'To Kill a Mockingbird',author:"Harper Lee", description: "One of the most cherished stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her fatherÔÇöa crusading local lawyerÔÇörisks everything to defend a black man unjustly accused of a terrible crime.", price:5.99,cover: Item5, quantity: 0},
        {id:32,title:'The Catcher in the Rye',author:"J.D. Salinger", description: "The hero-narrator of THE CATCHER IN THE RYE is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days. ",price:20.10,cover: Item6, quantity: 0}
    ],
    addedItems:[],
    saved:[],
    total: 0

}


const shoppingCartReducer= (state = initState,action)=>{

    if(action.type === ADD_FROM_LIST_TO_CART){
        let addedItem = action.book;
        //check if the action id exists in the addedItems
       let existed_item= state.addedItems.find(item=> addedItem.bookInfo.id === item.bookInfo.id)
       if(existed_item)
       {
          addedItem.bookInfo.quantity += 1 
           return{
              ...state,
               total: state.total + parseFloat(addedItem.bookInfo.price) 
                }
      }
       else{
          addedItem.bookInfo.quantity = 1;
          //calculating the total
          let newTotal = state.total + parseFloat(addedItem.bookInfo.price) 
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
  }

    if(action.type === REMOVE_ITEM){
        let itemToRemove= action.book;
        let new_items = state.addedItems.filter(item=> action.book.bookInfo.id !== item.bookInfo.id)
        
        //calculating the total
        let newTotal = state.total - (parseFloat(itemToRemove.bookInfo.price) * parseInt(itemToRemove.bookInfo.quantity))
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = action.book;
          addedItem.bookInfo.quantity += 1 
          let newTotal = state.total + parseFloat(addedItem.bookInfo.price)
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = action.book;
        //if the qt == 0 then it should be removed
        if(addedItem.bookInfo.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.bookInfo.id !== action.book.bookInfo.id)
            let newTotal = state.total - parseFloat(addedItem.bookInfo.price);
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.bookInfo.quantity -= 1
            let newTotal = state.total - parseFloat(addedItem.bookInfo.price)
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 9.99
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 9.99
        }
  }

  if(action.type === ADD_TO_SFL){
    let addedItem = action.book;
    //check if the action id exists in the addedItems
   let existed_item= state.saved.find(item=> addedItem.bookInfo.id === item.bookInfo.id)
   if(existed_item)
   { 
       return{
          ...state
            }
  }
   else{ 
      return{
          ...state,
          saved: [...state.saved, addedItem]
      } 
  }
}

if(action.type === REMOVE_FROM_SFL){
    let new_items = state.saved.filter(item=> action.book.bookInfo.id !== item.bookInfo.id)
    return{
        ...state,
        saved: new_items
    }
}
    return state
}
export default shoppingCartReducer