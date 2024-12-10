 const initialFriends = [
   {
     id: 118836,
     name: "Clark",
     image: "https://i.pravatar.cc/48?u=118836",
     balance: -7,
   },
   {
     id: 933372,
     name: "Sarah",
     image: "https://i.pravatar.cc/48?u=933372",
     balance: 20,
   },
   {
     id: 499476,
     name: "Anthony",
     image: "https://i.pravatar.cc/48?u=499476",
     balance: 0,
   },
 ];

 import "./App.css";
 import { useState } from "react";

 function App() {
   const [friends, setFriend] = useState(initialFriends);
   const [showAddFriend, setShowAddFriend] = useState(false);
   const [selectedFriend, setSelectedFriend] = useState(null);

   function handlerShowAdd() {
     setShowAddFriend((show) => !show);
   }
   function handlerAddFriend(friend) {
     setFriend((friends) => [...friends, friend]);
     setShowAddFriend(false);
   }
   function handleSelection(friend) {
     // setSelectedFriend(friend);
     setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
   }

   function handleSplitBill(value) {
     setFriend((friends) =>
       friends.map((friend) =>
         friend.id === selectedFriend.id
           ? { ...friend, balance: friend.balance + value }
           : friend
       )
     );
     setSelectedFriend(null);
   }
   return (
     <>
       <center>
         <h1 className="sonu">Let's Split The Bill </h1>
       </center>
       <div className="app">
         {/* <h2 className="Ramu">About The Project</h2> */}
         <div className="sidebar">
           <FriendList
             friends={friends}
             selectedFriend={selectedFriend}
             onselection={handleSelection}
           />
           {showAddFriend && <FormAddFriend onAddFriend={handlerAddFriend} />}
           <Button onClick={handlerShowAdd}>
             {showAddFriend ? "Close" : "Add Friend"}
           </Button>
         </div>
         {selectedFriend && (
           <FormSplitBill
             selectedFriend={selectedFriend}
             onSplitBill={handleSplitBill}
           />
         )}
       </div>
     </>
   );

   function FriendList({ friends, onselection, selectedFriend }) {
     return (
       <ul>
         {friends.map((friend) => (
           <Friend
             friend={friend}
             key={friend.id}
             onselection={onselection}
             selectedFriend={selectedFriend}
           />
         ))}
       </ul>
     );
   }
   function Friend({ friend, onselection, selectedFriend }) {
     const isSelected = selectedFriend?.id === friend.id;
     return (
       <li className={isSelected ? "selected" : ""}>
         <img src={friend.image} alt={friend.name} />
         <h3>{friend.name}</h3>
         {friend.balance < 0 && (
           <p className="red">
             You owe
             {friend.name} {Math.abs(friend.balance)} €
           </p>
         )}
         {friend.balance > 0 && (
           <p className="green">
             {friend.name} Owes you {Math.abs(friend.balance)} €
           </p>
         )}
         {friend.balance === 0 && (
           <p>
             You and
             {friend.name}
             are even
           </p>
         )}
         {/* <button className="button">Select</button> */}
         <Button onClick={() => onselection(friend)}>
           {isSelected ? "Close" : "select"}
         </Button>
       </li>
     );
   }
   function Button({ children, onClick }) {
     return (
       <button className="button" onClick={onClick}>
         {children}
       </button>
     );
   }

   function FormAddFriend({ onAddFriend }) {
     const [name, setName] = useState("");
     const [image, setImage] = useState("https://i.pravatar.cc/48");
     function handlerShow(e) {
       e.preventDefault();
       if (!name || !image) return;
       const id = crypto.randomUUID();
       const newFriend = {
         name,
         image: `${image}?=${id}`,
         balance: 0,
         id,
       };
       onAddFriend(newFriend);

       setName("");
       setImage("https://i.pravatar.cc/48");
     }

     return (
       <form className=".form-add-friend" onSubmit={handlerShow}>
         <label> 👩🏿‍🌾 Friend name</label>
         <input
           placeholder="Add Your Friends Name"
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />

         <label> 👥 Image URL</label>
         <input
           type="text"
           value={image}
           onChange={(e) => setImage(e.target.value)}
         />

         <button>Add</button>
       </form>
     );
   }

   function FormSplitBill({ selectedFriend, onSplitBill }) {
     const [bill, setBill] = useState("");
     const [paidByBill, setPaidByBill] = useState("");
     const paidByFriend = bill ? bill - paidByBill : "";
     const [whoIsPaying, setWhoIsPaying] = useState("user");

     function handleSubmit(e) {
       e.preventDefault();
       if (!bill || !paidByBill) return;
       onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByBill);
     }
     return (
       <form className="form-split-bill" onSubmit={handleSubmit}>
         <h2>Split a bill with {selectedFriend.name}</h2>
         <label> 💰 Bill Value</label>
         <input
           type="text"
           value={bill}
           onChange={(e) => setBill(Number(e.target.value))}
         />

         <label>🕴🏿 Your expenses</label>
         <input
           type="text"
           value={paidByBill}
           onChange={(e) =>
             setPaidByBill(
               Number(e.target.value) > bill
                 ? paidByBill
                 : Number(e.target.value)
             )
           }
         />

         <label> 🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
         <input type="text" disabled value={paidByFriend} />

         <label> 😀 Who is paying the bill</label>
         <select
           value={whoIsPaying}
           onChange={(e) => setWhoIsPaying(e.target.value)}
         >
           <option value="user">You</option>
           <option value="friend">{selectedFriend.name}</option>
         </select>

         <button>Add</button>
       </form>
     );
   }
 }
 export default App;
