import React from 'react';
import ReactDOM from 'react-dom';
import ListofBooks,{ViewBooks} from './ListOfBooks';
import { shallow,configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
  });

let wrapper;
beforeEach(() => {
   wrapper = shallow(<ListofBooks />, { disableLifecycleMethods: true });
});
afterEach(() => {
   wrapper.unmount();
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListofBooks />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('View Books renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ViewBooks />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('test the list of books service call', ()=>{
      
const spyDidMount = jest.spyOn(ListofBooks.prototype,"fetchInventoryBooks");
fetch.mockImplementation(() => {
   return Promise.resolve({
     status: 200,
     json: () => {
     return Promise.resolve({
        title: "inferno",
        description: "some desc"
      });
    }
  });
});
const fetchInventoryBooks = wrapper.instance().fetchInventoryBooks();
// expecting componentDidMount have been called
expect(fetchInventoryBooks).toHaveBeenCalled();
fetchInventoryBooks.then(() => {
   // updating the wrapper
   wrapper.update();
   expect(wrapper.find("book.title").text()).toContain("inferno");
   spyDidMount.mockRestore();
   fetch.mockClear();
   done();
});
})
