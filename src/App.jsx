import {useState} from "react";
import Form from "./Form";
import {nanoid} from "nanoid";
import Items from "./Items";

// we also have to get items from the local storage as when page reloads, all the displayed items will be gone
const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
        list = JSON.parse(localStorage.getItem("list"));
    } else {
        list = [];
    }
    return list;
};
// set items store in local storage
const setLocalStorage = (items) => {
    localStorage.setItem("list", JSON.stringify(items));
};

// All this can be write as below as well.
const defaultList = JSON.parse(localStorage.getItem("list") || "[]");
// =====================================
const App = () => {
    // const [items, setItem] = useState(getLocalStorage());
    const [items, setItem] = useState(defaultList);

    const addItem = (itemName) => {
        const newItem = {
            name: itemName,
            completed: false,
            id: nanoid(),
        };
        const newItems = [...items, newItem];
        setItem(newItems);
        setLocalStorage(newItems);
    };

    const removeItem = (itemID) => {
        const newItems = items.filter((item) => item.id !== itemID);
        setItem(newItems);
        setLocalStorage(newItems);
    };

    const editItem = (itemID) => {
        const newItems = items.map((item) => {
            if (item.id === itemID) {
                const newItem = {...item, completed: !item.completed};
                return newItem;
            }
            return item;
        });
        setItem(newItems);
        setLocalStorage(newItems);
    };

    return (
        <section className="section-center">
            <Form addItem={addItem} />
            <Items items={items} removeItem={removeItem} editItem={editItem} />
        </section>
    );
};

export default App;
