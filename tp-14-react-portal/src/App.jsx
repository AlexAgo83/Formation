import {createPortal} from 'react-dom'

function App() {
  return <div style={{
    height: 300,
    overflowY: 'scroll',
    background: '#EEE',
    margin: 20,
    position: 'relative'
  }}>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, accusantium corrupti ipsum voluptatem quaerat est tenetur consequatur dolor eveniet harum laudantium, temporibus eligendi in necessitatibus asperiores eum nam ipsam quas.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptas. Dolorum similique assumenda maiores accusantium nemo voluptatum explicabo provident, modi rerum fugit cum, quos et ad voluptas quidem. Doloremque, nobis.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita soluta officia nihil inventore! Eum amet rerum consectetur perspiciatis ipsa. Optio ratione ullam iure ea perferendis alias aliquid maxime magni in.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem eius et corrupti architecto deserunt facere dolore esse ipsa reiciendis eum nostrum dolores, quibusdam fuga est voluptate numquam blanditiis? Dolore?
    </p>
    <Modal />
  </div>
}

function Modal () {
  return createPortal(<div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        border: 'solid 1px grey',
        background: '#FFF'
      }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit
    </div>, document.body)
}

export default App
