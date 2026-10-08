export function transition(state,action) {
  switch(action.type) {
    case 'add': {
      const title=String(action.title??'').trim();
      if (!title || title.length>160 || state.items.some(item=>item.id===action.id)) throw new Error('Invalid task');
      return {...state,items:[...state.items,{id:action.id,title,done:false}]};
    }
    case 'toggle': return {...state,items:state.items.map(item=>item.id===action.id?{...item,done:!item.done}:item)};
    case 'delete': {
      const index=state.items.findIndex(item=>item.id===action.id);
      if(index<0)return state;
      return {items:state.items.filter(item=>item.id!==action.id),deleted:{item:state.items[index],index}};
    }
    case 'undo': {
      if(!state.deleted)return state;
      const items=[...state.items];items.splice(Math.min(state.deleted.index,items.length),0,state.deleted.item);
      return {items,deleted:null};
    }
    default: throw new Error('Unknown action');
  }
}
