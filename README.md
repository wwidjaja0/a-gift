# Gift Website

A beautiful, animated web application that presents a personalized gift-opening experience with smooth animations, customizable gift items, and personalized notes.

## Features

- **Loading Screen**: Animated intro sequence when the website loads
- **Gift Opening Animation**: Interactive gift box that opens on click with smooth animations
- **Customizable Gift Items**: Display multiple gift items in a responsive grid layout
- **Personalized Notes**: Letter component that displays personalized notes based on the route
- **Path-based Routing**: Simple routing system using paths like `/person1`, `/person2`, etc.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

1. Start the backend server (in one terminal):
```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

2. Start the frontend development server (in another terminal):
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Usage

- Visit `http://localhost:3000/person1` or `http://localhost:3000/person2` to see personalized content
- The app will show a loading screen, then a gift box that you can click to open
- After opening, you'll see gift items and a letter
- Click the letter to view the personalized note for that person

## Customization

### Adding Personalized Notes

Edit `server/notes.json` to add or modify notes for different people:

```json
{
  "person1": "Your personalized note here...",
  "person2": "Another personalized note...",
  "person3": "Yet another note..."
}
```

### Customizing Gift Items

Edit `src/components/GiftContent.jsx` to modify the gift items array. Each item can have:
- `title`: Display title
- `description`: Optional description
- `image`: Image URL (optional)
- `link`: Clickable link
- `type`: Type of gift item

## Project Structure

```
agift/
├── src/
│   ├── components/       # React components
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component
│   └── main.jsx        # Entry point
├── server/
│   ├── server.js        # Express backend
│   └── notes.json       # Personalized notes storage
├── package.json
└── vite.config.js
```

## Technologies Used

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Express.js, Node.js
- **Styling**: CSS3 with animations and transitions

## License

MIT

